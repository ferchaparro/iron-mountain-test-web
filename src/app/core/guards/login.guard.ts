
import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { CookiesService, NavigateService } from 'src/app/core/services/common'
import { keywords } from '../constants'

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private navigate: NavigateService, private cookies: CookiesService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.cookies.get(keywords.AUTH_KEY)) {
      return true
    }
    return this.navigate.toMain().then(() => false)

  }
}
