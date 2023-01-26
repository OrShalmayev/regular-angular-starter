import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { Provider } from '@angular/core';

const eventDelegation = {
  map: new Map(),
  init: false,
  supports(eventName: string): boolean {
    return eventName.includes('delegate');
  },
  addEventListener(element, eventName, originalHandler): any {
    this.map.set(element, originalHandler);

    if (!this.init) {
      document.addEventListener('click', (e) => {
        this.map.forEach((handler, element) => {
          if (element.contains(e.target)) {
            // In real-life only the handler should run inside the zone
            handler(e);
          }
        });
      });
      this.init = true;
    }

    return () => {
      this.map.delete(element);
    };
  }
};

export const EVENT_DELEGATION_PLUGINS_PROVIDER: Provider = {
  provide: EVENT_MANAGER_PLUGINS,
  useValue: eventDelegation,
  deps: [],
  multi: true
};
