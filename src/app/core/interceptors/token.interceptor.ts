import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { keywords } from '../constants'
import { CookiesService } from '../services/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookies: CookiesService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(this.cookies.get(keywords.AUTH_KEY))?.token;
    if(token){
      req = req.clone({ headers: req.headers.set(keywords.AUTHORIZATION, `Bearer ${token}`)});
    }

    return next.handle(req);
  }

}
