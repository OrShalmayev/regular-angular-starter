import { TrackByFunction } from '@angular/core';
import { trackByFactory } from '@stlmpp/utils';

export function trackById<T extends { id: string }>(): TrackByFunction<T> {
  return trackByFactory('id');
}

export function trackByIndex<T>(): TrackByFunction<T> {
  return trackByFactory();
}
