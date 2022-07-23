import { Injectable } from '@angular/core';
import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class PageTitleStrategy extends DefaultTitleStrategy {
    override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
        let title = super.buildTitle(snapshot);
        if (title) {
            title = `${title} - Or Shalmayev`;
        }
        return title;
    }
}
