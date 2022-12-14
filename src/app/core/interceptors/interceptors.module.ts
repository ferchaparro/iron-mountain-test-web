
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TokenInterceptor } from './token.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
})
export class InterceptorsModule {}
