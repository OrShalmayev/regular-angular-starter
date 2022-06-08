import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { Utility } from './utility';

import { createStoreProviders } from '@shared/store/create-store-providers';

const store = createStore(
  {
    name: 'utilities',
  },
  withEntities<Utility>()
);

const [UtilitiesStoreProviders, BaseClass, useFactory] = createStoreProviders(store);

@Injectable()
export class UtilitiesStore extends BaseClass {}

UtilitiesStoreProviders.push({ provide: UtilitiesStore, useFactory });

export { UtilitiesStoreProviders };
