import { Injectable } from '@angular/core';
import { select, setProp } from '@ngneat/elf';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { GoBackButtonStore } from './go-back-button.store';

@Injectable({ providedIn: 'root' })
export class GoBackButtonService {
  constructor(private readonly store: GoBackButtonStore) {}

  private _uniqueId = 0;

  addButton(): [id: number, show$: Observable<boolean>] {
    const id = this._uniqueId++;
    this.store.update(state => ({ ...state, buttons: new Set(state.buttons).add(id) }));
    const show$ = this.store.pipe(select(state => state.buttons)).pipe(
      map(buttons => Math.max(...buttons) === id),
      distinctUntilChanged()
    );
    return [id, show$];
  }

  removeButton(id: number): void {
    this.store.update(
      setProp('buttons', buttons => {
        const newSet = new Set(buttons);
        newSet.delete(id);
        return newSet;
      })
    );
  }
}
