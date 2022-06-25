import { Injectable } from '@angular/core';
import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
import {isNull} from 'lodash'
@Injectable()
export class PageTitleStrategy extends DefaultTitleStrategy {
  override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
    let title = super.buildTitle(snapshot);
    if (!isNull(title)) {
      title = `${title} - Emp`;
    }
    return title;
  }
}
