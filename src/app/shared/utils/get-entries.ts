import { Entries } from 'type-fest';

import { AnyObject } from '@shared/utils/type';

export function getEntries<T extends AnyObject>(object: T): Entries<T> {
  return Object.entries(object) as Entries<T>;
}
