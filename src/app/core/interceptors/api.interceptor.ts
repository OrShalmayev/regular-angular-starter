import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  intercept(_req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = _req.clone({ url: this.handleUrl(_req.url) });
    return next.handle(req);
  }

  handleUrl(url: string): string {
    if (url.includes('assets')) {
      return url;
    }
    return `${environment.apiPath}${url.startsWith('/') ? url : '/' + url}`;
  }
}
