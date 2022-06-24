import { isPlatformBrowser } from '@angular/common';
import { Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { AnyObject } from '@shared/utils/type';

export const WINDOW = new InjectionToken('WindowToken');

export abstract class WindowRef {
    getNativeWindow(): Window | AnyObject {
        throw new Error('Not implemented.');
    }
}

@Injectable()
export class BrowserWindowRef extends WindowRef {
    override getNativeWindow(): Window | AnyObject {
        return typeof window !== 'undefined' ? window : {};
    }
}

export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: string): Window | AnyObject {
    if (isPlatformBrowser(platformId)) {
        return browserWindowRef.getNativeWindow();
    }
    return {};
}

export const WINDOW_PROVIDERS = [
    { provide: WindowRef, useClass: BrowserWindowRef },
    { provide: WINDOW, useFactory: windowFactory, deps: [WindowRef, PLATFORM_ID] },
];
