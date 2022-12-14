import {Injectable} from "@angular/core"
import {CommonService} from './common.service'
import {Builder} from 'src/app/model'
import {Observable, of} from 'rxjs'
import {Authentication, Credentials} from 'src/app/model/auth'
import {map, catchError} from "rxjs/operators"
import { CookiesService } from "./cookies.service"
import { keywords } from "../../constants"


@Injectable({providedIn: 'root'})
export class SessionService {
  constructor(
    private commonService: CommonService,
    private cookies: CookiesService,
    private builder: Builder
  ){}

  login(credentials: Credentials): Observable<{hasError: boolean, error: string}> {
    return this.commonService.doPost<Credentials, Authentication>(this.builder.reqConfigBuilder<Credentials>()
      .url('v1/auth/sign-in')
      .body(credentials)
      .build(), false)
      .pipe(
        map(authData => {
          this.cookies.put(keywords.AUTH_KEY, JSON.stringify(authData))
          return {hasError: false, error: null}
        }),
        catchError((e) => of({hasError: true, error: e.error.message }))
      )
  }

}
