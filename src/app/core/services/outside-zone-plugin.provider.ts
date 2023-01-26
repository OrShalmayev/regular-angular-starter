import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { Provider } from '@angular/core';

const outsideZone = {
  supports(eventName: string) {
    return eventName.includes('outside-zone');
  },
  addEventListener(element, eventName, originalHandler) {
    this.manager.getZone().runOutsideAngular(() => {
      element.addEventListener(eventName, originalHandler);
    });

    return () => {
      element.removeEventListener(eventName, originalHandler);
    };
  }
};

export const OUTSIDE_ZONE_PLUGINS_PROVIDER: Provider = {
  provide: EVENT_MANAGER_PLUGINS,
  useValue: outsideZone,
  deps: [],
  multi: true
};
