import { TrackByFunction } from '@angular/core';
import {isNull} from 'lodash'
export const trackByFactory = <T>(key?: keyof T, ...fallbackKeys: (keyof T)[]): TrackByFunction<T> => {
  if (!key) {
    return index => index;
  }
  return (index, element) => {
    if (isNull(element)) {
      return index;
    }
    if (element?.[key]) {
      return element[key];
    } else {
      for (const fallbackKey of fallbackKeys) {
        if (element?.[fallbackKey]) {
          return element[fallbackKey];
        }
      }
      return index;
    }
  };
};

export const trackByConcat = <T>(keys: (keyof T)[]): TrackByFunction<T> => (index, element) => {
  return keys
    .filter(key => !!element[key])
    .reduce((acc, item, index1) => (index1 > 0 ? `${acc}-${element[item]}` : `${element[item]}${acc}`), '');
};

export function trackById<T extends { id: string }>(): TrackByFunction<T> {
    return trackByFactory('id');
  }
  
  export function trackByIndex<T>(): TrackByFunction<T> {
    return trackByFactory();
  }
  