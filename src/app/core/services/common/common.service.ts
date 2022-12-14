import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { ReqConfig, MessageType } from 'src/app/model/http'
import { environment } from 'src/environments/environment'
import { CommunicationService } from './communication.service'
import { NavigateService } from './navigate.service'
import { CookiesService } from './cookies.service'


@Injectable({providedIn: 'root'})
export class CommonService {
  constructor (
    private http: HttpClient,
    private communicationService: CommunicationService,
    private navigation: NavigateService,
    private cookies: CookiesService
  ) {}

  private noHandleError = (err) => throwError(err)
  private handleError = (err) => {
    if(!environment.production) { console.log(JSON.stringify(err)) }
    if(err.status === 0) {
      this.cookies.logout()
      this.navigation.toLogin()
      this.communicationService.alertDanger('Forbidden')
    } else if(err.status === 401){
      this.cookies.logout()
      this.navigation.toLogin()
      this.communicationService.alertDanger(err.error.message)
    } else if(err.status === 403){
      this.communicationService.alertDanger(err.error.message)
    } else if(err.status === 404) {
      this.navigation.byUrl('404')
    } else if(err.status === 406){
      if(typeof(err.error)==='string'){
        err.error = JSON.parse(err.error)
      }
      this.communicationService.alertDanger(err.error.message)
    } else {
      this.communicationService.alertDanger(['GENERAL_ERROR_LINE_1', 'GENERAL_ERROR_LINE_2'], {error: 0, message: err.message})
    }
    return throwError(err)
  }

  private doRequest<P, R>(method: string, p:ReqConfig<P>, _handleError: boolean = true): Observable<R> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      }),
      reportProgress: p.reportProgress,
      responseType: p.responseType
    }
    let observable: Observable<R>
    if(method === "GET"){
      observable = this.http.get<R>((p.url.startsWith('http')?'':environment.apiURL)+p.url, httpOptions)
    }else if(method === "POST"){
      observable = this.http.post<R>((p.url.startsWith('http')?'':environment.apiURL)+p.url, p.body, httpOptions)
    }else if(method === "DELETE"){
      observable = this.http.delete<R>((p.url.startsWith('http')?'':environment.apiURL)+p.url, httpOptions)
    }else if(method === "PUT"){
      observable = this.http.put<R>((p.url.startsWith('http')?'':environment.apiURL)+p.url, p.body, httpOptions)
    } else {
      observable = throwError({message: 'Method not supported'})
    }

    return observable
      .pipe(catchError(_handleError?this.handleError:this.noHandleError))
      .pipe(map(response =>{
        const messageResponse = (response as any)
        if(messageResponse && messageResponse.message && p.showMessage){
          switch(p.messageType){
            case MessageType.ALERT: this.communicationService.alertSuccess(messageResponse.message); break
            case MessageType.TOAST: this.communicationService.toast(messageResponse.message); break
          }
        }
        return response as R
      }))
  }

  doPostFile<P, R>(p:ReqConfig<P>): Observable<R> {
    const httpOptions = {
      headers: new HttpHeaders(),//{
      //    'Content-Type': 'multipart/form-data; charset=utf-8'
      //}),
      reportProgress: p.reportProgress,
      responseType: p.responseType,
      multipart: true
    }
    const url = environment.apiURL+p.url
    const formData:FormData = new FormData()

    if(p.file){
      formData.append("file", p.file, p.file.name)
    }
    if(p.body){
      formData.append("data", (p.body as any).toString())
    }

    const observ: Observable<R> = this.http.post<R>(url, formData, httpOptions)


    return observ
      .pipe(catchError(this.handleError))
      .pipe(map(response => {
        const messageResponse = (response as any)
        if(messageResponse && messageResponse.message && p.showMessage){
          switch(p.messageType){
            case MessageType.ALERT: this.communicationService.alertSuccess(messageResponse.message); break
            case MessageType.TOAST: this.communicationService.toast(messageResponse.message); break
          }
        }
        return response as R
      }))
  }

  transformFilter(filter: {key: string, value: any}[]): string {
    return filter
      .map(f => ''.concat('&', f.key, '=', encodeURIComponent(f.value)))
      .join('')
  }


  doPost<P, R>(p:ReqConfig<P>, handleError: boolean = true): Observable<R> {
    return this.doRequest('POST', p, handleError)
  }

  doGet<R>(p:ReqConfig<any>, handleError: boolean = true): Observable<R> {
    return this.doRequest('GET', p, handleError)
  }

  doPut<P, R>(p:ReqConfig<P>, handleError: boolean = true): Observable<R> {
    return this.doRequest('PUT', p, handleError)
  }

  doDelete<R>(p:ReqConfig<any>, handleError: boolean = true): Observable<R> {
    return this.doRequest('DELETE', p, handleError)
  }

}
