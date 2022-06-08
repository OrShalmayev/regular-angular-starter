import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { getEntries } from '@shared/utils/get-entries';
import { AnyObject } from '@shared/utils/type';

export function includeKeys<T extends AnyObject, K extends keyof T>(keys: K[]): OperatorFunction<T, Pick<T, K>> {
  if (!keys.length) {
    return pipe();
  }
  const keysSet = new Set(keys);
  return map(state =>
    getEntries(state).reduce((entity, [key, value]) => {
      if (keysSet.has(key as K)) {
        entity = { ...entity, [key]: value };
      }
      return entity;
    }, {} as T)
  );
}
