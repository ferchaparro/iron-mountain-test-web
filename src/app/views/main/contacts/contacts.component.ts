import { ViewChild } from '@angular/core'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { Observable, Subject, merge } from 'rxjs'
import { tap, switchMap, map, debounceTime, startWith, takeUntil } from 'rxjs/operators'
import { PagerComponent } from 'src/app/components/pager'
import { Page } from 'src/app/components/pager/model/page.model'
import { CommunicationService, NavigateService } from 'src/app/core/services/common'
import { ContactsService } from 'src/app/core/services/operation'
import { Contact } from 'src/app/model/operation/contact.model'
import {FormBuilder, FormGroup} from "@angular/forms"
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        'max-width': '300px',
        opacity: 1,
        backgroundColor: 'white'
      })),
      state('closed', style({
        'max-width': '0px',
        opacity: 0,
        backgroundColor: 'transparent'
      })),
      transition('open => closed', [
        animate('0.5s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-in-out')
      ]),
    ]),
  ]
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts$: Observable<Page<Contact>>
  displayedColumns : string[] = ['id', 'fullName', 'address', 'phone', 'uniquePopulationRegistryCode', 'creationDate', 'lastUpdate', 'actions'];
  refreshDatatable: Subject<void> = new Subject<void>()
  appliedFilter: string = ''
  hideFilter: boolean = true
  form: FormGroup
  unsubscriber$: Subject<void> = new Subject<void>()
  @ViewChild(PagerComponent) pager: PagerComponent
  @ViewChild(MatSort) sort: MatSort
  constructor(private contactsService: ContactsService, private fb: FormBuilder, private navigation: NavigateService, private communicationService: CommunicationService) {
    this.form = this.fb.group({
      filter: ['']
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.contacts$ = this.contactsRemoteData();
  }

  private contactsRemoteData(): Observable<Page<Contact>>{
    const sortChange$ = this.sort.sortChange.pipe(tap(()=>this.pager.paginator.pageIndex = 0))
    const filterChange$ = this.form.get('filter').valueChanges
    .pipe(
      debounceTime(500),
      tap(filter => this.appliedFilter = filter)
    )
    return merge(sortChange$, this.pager.paginator.page, this.refreshDatatable.asObservable(), filterChange$)
    .pipe(
      debounceTime(300),
      startWith({} as any),
      switchMap(this.findContactsData.bind(this)),
      map(data => {
        if (data === null) {
          return {content: [], totalElements: 0} as Page<Contact>;
        }
        return data;
      }))
  }

  private findContactsData(): Observable<Page<Contact>> {
    return this.contactsService.retrieveContacts(this.sort.active, this.sort.direction, this.pager.paginator.pageIndex, this.pager.paginator.pageSize, this.appliedFilter);
  }

  refresh(){
    this.refreshDatatable.next();
  }

  onClickAdd() {
    this.navigation.byUrl('new')
  }

  onClickImport() {
    this.navigation.byUrl('import')
  }

  onClickEdition({id}: Contact) {
    this.navigation.byUrl(`edit/${id}`)
  }

  onClickDelete({id, fullName}: Contact) {
    this.communicationService.confirmDanger(['DELETE_CONFIRM_1', 'DELETE_CONFIRM_2'], {fullName}, 'CONTACT_DELETION_CONFIRMATION', false, 'DELETE_OK_BUTTON')
    .onAccept.pipe(
      takeUntil(this.unsubscriber$),
      switchMap(()=>this.contactsService.deleteContact(id))
    ).subscribe(()=> this.refresh())
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next()
    this.unsubscriber$.complete()
  }

}
