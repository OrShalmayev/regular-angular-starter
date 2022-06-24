import {Injectable} from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RouterHelperService {

    constructor(private router: Router) {
    }

    loadingRoute$ = this.router.events.pipe(
        map((event: any) => {
            if (event?.route?.data?.preload) {
                return false;
            }
            if (event instanceof RouteConfigLoadStart) {
                return true;
            } else if (event instanceof RouteConfigLoadEnd) {
                return false;
            }
            return false;
        })
    );
}
