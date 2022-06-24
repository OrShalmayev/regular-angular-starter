import { isPlatformBrowser } from '@angular/common';
import { Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

export const WINDOW = new InjectionToken('WindowToken');

export abstract class WindowRef {
  getNativeWindow(): Window | Record<string, unknown> {
    throw new Error('Not implemented.');
  }
}

@Injectable()
export class BrowserWindowRef extends WindowRef {
  override getNativeWindow(): Window | Record<string, unknown> {
    return typeof window !== 'undefined' ? window : {};
  }
}

export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: string
): Window | Record<string, unknown> {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.getNativeWindow();
  }
  return {};
}

export const WINDOW_PROVIDERS = [
  { provide: WindowRef, useClass: BrowserWindowRef },
  { provide: WINDOW, useFactory: windowFactory, deps: [WindowRef, PLATFORM_ID] },
];
