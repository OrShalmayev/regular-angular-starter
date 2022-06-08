import { finalize, MonoTypeOperatorFunction, Observable, Subscription } from 'rxjs';

interface CacheStore {
  value: unknown;
  timeout: () => void;
}

const FIFTEEN_MINUTES_IN_MS = 900_000;

export class Cache {
  constructor(private readonly timeout = FIFTEEN_MINUTES_IN_MS) {}

  private readonly _cache = new Map<string, CacheStore>();

  private _serializeKey(params: unknown): string {
    return JSON.stringify(params);
  }

  private _setCache(key: string, value: unknown): void {
    const timeout = setTimeout(() => {
      this._cache.delete(key);
    }, this.timeout);
    this._cache.set(key, { timeout: () => clearTimeout(timeout), value });
  }

  burstCache(params: unknown): void {
    const key = this._serializeKey(params);
    if (this._cache.has(key)) {
      const { timeout } = this._cache.get(key)!;
      timeout();
      this._cache.delete(key);
    }
  }

  burstAllCache(): void {
    for (const [, { timeout }] of this._cache) {
      timeout();
    }
    this._cache.clear();
  }

  use<T>(...params: unknown[]): MonoTypeOperatorFunction<T> {
    const key = this._serializeKey(params);
    return source =>
      new Observable<T>(subscriber => {
        let subscription: Subscription | undefined = undefined;
        if (this._cache.has(key)) {
          subscriber.next(this._cache.get(key)!.value as T);
          subscriber.complete();
        } else {
          subscription = source.subscribe({
            next: value => {
              this._setCache(key, value);
              subscriber.next(value);
            },
            complete: () => subscriber.complete(),
            error: error => subscriber.error(error),
          });
        }
        return () => {
          subscription?.unsubscribe();
        };
      });
  }

  burst<T>(...params: unknown[]): MonoTypeOperatorFunction<T> {
    return finalize(() => {
      this.burstCache(params);
    });
  }

  burstMultiple<T>(params: unknown[][]): MonoTypeOperatorFunction<T> {
    return finalize(() => {
      for (const param of params) {
        this.burstCache(param);
      }
    });
  }

  burstAll<T>(): MonoTypeOperatorFunction<T> {
    return finalize(() => {
      this.burstAllCache();
    });
  }
}
