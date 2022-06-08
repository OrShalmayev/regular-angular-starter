import { AnyObject } from '@shared/utils/type';

export type LocalStorageStateStorageConfigSpecialKeyType = 'set' | 'date';

export interface LocalStorageStateStorageConfigSpecialKey<T extends AnyObject> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  get?: (state: T) => any;
  set?: (state: T, value: any) => T;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  type?: LocalStorageStateStorageConfigSpecialKeyType;
  key?: keyof T;
}

export interface LocalStorageStateStorageConfig<T extends AnyObject> {
  ignoreKeys?: Array<keyof T>;
  includeKeys?: Array<keyof T>;
  specialKeys?: Array<LocalStorageStateStorageConfigSpecialKey<T>>;
}

export interface StorePersistConfigSpecialKeysInternal<T extends AnyObject>
  extends LocalStorageStateStorageConfigSpecialKey<T> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getFromStore: (state: T) => any;
  setToStore: (state: T, value: any) => T;
  getFromPersist: (state: T) => any;
  setToPersist: (state: T, value: any) => T;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface StorePersistConfigInternal<T extends AnyObject>
  extends Pick<LocalStorageStateStorageConfig<T>, 'ignoreKeys'> {
  specialKeys?: Array<StorePersistConfigSpecialKeysInternal<T>>;
}
