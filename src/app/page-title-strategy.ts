import { Injectable } from '@angular/core';
import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
import { isNotNil } from 'st-utils';

@Injectable()
export class PageTitleStrategy extends DefaultTitleStrategy {
  override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
    let title = super.buildTitle(snapshot);
    if (isNotNil(title)) {
      title = `${title} - Emp`;
    }
    return title;
  }
}
