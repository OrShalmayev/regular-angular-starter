import { APP_INITIALIZER, Provider, Type } from '@angular/core';
import { Store } from '@ngneat/elf';
import { isBoolean } from 'st-utils';

import { LocalStorageStateStorage } from '@shared/store/local-storage-state-storage';
import { LocalStorageStateStorageConfig } from '@shared/store/local-storage-state-storage-config';

export function createStoreProviders<S extends Store>(
  store: S,
  persist?: LocalStorageStateStorageConfig<S['state']> | boolean
): [providers: Provider[], baseClass: Type<S>, useFactory: () => S] {
  class StoreClass {}
  Object.defineProperty(StoreClass, 'name', { value: store.name });
  const factory = (): S => {
    if (persist) {
      LocalStorageStateStorage.persistStore(store, isBoolean(persist) ? {} : persist);
    }
    return store;
  };
  const providers: Provider[] = [];
  if (persist) {
    const { initialized$ } = LocalStorageStateStorage.persistStore(store, isBoolean(persist) ? {} : persist);
    providers.push({
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => () => initialized$,
    });
  }
  return [providers, StoreClass as Type<S>, factory];
}
