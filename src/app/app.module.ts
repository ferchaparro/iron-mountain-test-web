import {APP_INITIALIZER, Injector, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core";
import {ComponentsModule} from "./components";
import {ModelModule} from "./model";
import {LOCATION_INITIALIZED, registerLocaleData} from "@angular/common";
import {RouterModule} from "@angular/router";
import localeEsMx from '@angular/common/locales/es-MX';
import localeEn from '@angular/common/locales/en';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {HttpClient} from "@angular/common/http";
import { ViewsModule } from './views/views.module';

registerLocaleData(localeEsMx);
registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule.withServerTransition({ appId: 'webApp' }),
    BrowserAnimationsModule,
    ViewsModule,
    CoreModule,
    ComponentsModule,
    ModelModule,

    // NgxsModule.forRoot([AuthState], {
    //   developmentMode: !environment.production
    // }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    // NgxSkeletonLoaderModule.forRoot({animation:'progress-dark', theme: {'background-color':'#7B7D7D'}})
  ],
  providers: [
    { provide: LOCALE_ID,
      useFactory: () => {
        const browserLocale = navigator?.language
        const enLocale = browserLocale.includes('en')
        return enLocale?"en":"es-MX"
      },
      deps:[]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService, injector: Injector) => {
        return () =>  {
          const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null))
          locationInitialized.then(() => {
            const browserLocale = navigator?.language
            const enLocale = browserLocale.includes('en')
            const langToSet = enLocale?'en':'es-MX'


            translate.setDefaultLang(langToSet)
            translate.use(langToSet).subscribe(()=>{console.log(`browserLang: ${navigator.language}`, `lang setted: ${langToSet}`)})
          })
        }
      },
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }