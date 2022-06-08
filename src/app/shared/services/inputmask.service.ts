import { Injectable } from '@angular/core';
import Inputmask from 'inputmask';
import { isString } from 'st-utils';

@Injectable({ providedIn: 'root' })
export class InputmaskService {
  createMask(aliasOrOptions: string | Inputmask.Options, opts?: Inputmask.Options): Inputmask.Instance {
    if (isString(aliasOrOptions)) {
      return new Inputmask(aliasOrOptions, opts);
    }
    return new Inputmask(aliasOrOptions);
  }
}
