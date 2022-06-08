import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { createStoreProviders } from '@shared/store/create-store-providers';

export interface GoBackButtonState {
  buttons: Set<number>;
}

const store = createStore(
  {
    name: 'go-back-button',
  },
  withProps<GoBackButtonState>({
    buttons: new Set(),
  })
);

const [GoBackButtonStoreProviders, BaseClass, useFactory] = createStoreProviders(store);

@Injectable()
export class GoBackButtonStore extends BaseClass {}

GoBackButtonStoreProviders.push({ provide: GoBackButtonStore, useFactory });

export { GoBackButtonStoreProviders };
