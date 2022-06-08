import { Injectable } from '@angular/core';
import { finalize, MonoTypeOperatorFunction } from 'rxjs';

import { Cache } from './cache';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly _caches: Cache[] = [];

  create(timeout?: number): Cache {
    const cache = new Cache(timeout);
    this._caches.push(cache);
    return cache;
  }

  burstAllCache(): this {
    for (const cache of this._caches) {
      cache.burstAllCache();
    }
    return this;
  }

  burstAll<T>(): MonoTypeOperatorFunction<T> {
    return finalize(() => {
      this.burstAllCache();
    });
  }
}
