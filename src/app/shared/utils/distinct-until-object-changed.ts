import { distinctUntilChanged, MonoTypeOperatorFunction } from 'rxjs';
import { isObjectEqualShallow } from 'st-utils';

import { AnyObject } from '@shared/utils/type';

export function distinctUntilObjectChanged<T extends AnyObject>(): MonoTypeOperatorFunction<T> {
  return distinctUntilChanged((objectA, objectB) => isObjectEqualShallow(objectA, objectB));
}
