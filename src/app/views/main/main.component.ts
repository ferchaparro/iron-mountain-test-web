import {MediaMatcher} from '@angular/cdk/layout'
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core'
import {CookiesService, DialogService, EventService, NavigateService, SessionService} from "src/app/core/services/common"
import {MatSidenav} from "@angular/material/sidenav"

import {Observable, Subject} from "rxjs"

import {of} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  @ViewChild('snav')
  snav: MatSidenav|undefined;
  mobileQuery: MediaQueryList;
  fillerNav$: Observable<{icon: string, label: string, route: string}[]>
  public static scrollSubject: Subject<void> = new Subject<void>()
  

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private session: SessionService,
              private cookies: CookiesService,
              private navigation: NavigateService,
              private events: EventService,
              private dialog: DialogService) {

    this.fillerNav$ = of([
      {icon: 'person', label: 'MENU.CONTACTS', route: '/'},
      {icon: 'add', label: 'MENU.NEW_CONTACT', route: '/new'},
      {icon: 'upload_file', label: 'MENU.IMPORT', route: '/import'}
    ])
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }



  navigate(url: string) {
    this.navigation.byUrl(url)
    this.snav?.close();
  }

  logout(){
    this.cookies.logout()
    this.navigation.toLogin()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

}
