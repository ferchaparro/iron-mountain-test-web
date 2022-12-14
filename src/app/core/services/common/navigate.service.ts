
import { Injectable } from '@angular/core'
import {Router} from '@angular/router'
import {Location} from "@angular/common"

@Injectable({providedIn: 'root'})
export class NavigateService {

  constructor(private router: Router, private location: Location) {}

  byUrl(url: string){
    return this.router.navigateByUrl(url)
  }

  byUrlWithData<T>(url: string, data: T){
    return this.router.navigateByUrl(url, {state: {data}})
  }

  getCurrentNavigation() {
    return this.router.getCurrentNavigation()
  }

  toLogin(user: string = ''){
    return this.byUrl(`/login${user?`/${user}`:''}`)
  }

  toMain(){
    return this.byUrl('/')
  }

  back() {
    this.location.back()
  }
}
