import { Component } from '@angular/core';
import {CommunicationService, DialogService, NavigateService, SessionService} from 'src/app/core/services/common';
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  columnsToDisplay: string[] = ['placeString', 'dates', 'lessorString', 'customerString', 'actions']
  sections = [{icon: 'apartment', label: 'Lugares', route: '/op/places'},
    {icon: 'edit_calendar', label: 'Rentas', route: '/op/rents'},
    {icon: 'event', label: 'Calendario', route: '/op/calendar'}]
  constructor(private communication: CommunicationService, private sessionService: SessionService,
              private dialog: DialogService, private navigation: NavigateService){
  }

  
  navigate(route: string) {
    this.navigation.byUrl(route);
  }
}
