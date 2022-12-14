import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { CookiesService, NavigateService } from 'src/app/core/services/common'
import { keywords } from '../constants'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private navigate: NavigateService, private cookies: CookiesService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = JSON.parse(this.cookies.get(keywords.AUTH_KEY))?.token
    if (token && token !== '') {
      return true
    }
    return this.navigate.toLogin().then(() => false)

  }

}
