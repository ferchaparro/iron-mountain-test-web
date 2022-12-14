import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {Observable} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import { NavigateService } from 'src/app/core/services/common'
import { ContactsService } from 'src/app/core/services/operation'
import { Contact } from 'src/app/model/operation/contact.model'

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  contact$: Observable<Contact>

  constructor(private navigation: NavigateService, private contactsService: ContactsService, private route: ActivatedRoute) {
    this.contact$ = this.route.paramMap.pipe(
      map(params=> parseInt(params.get('id'))),
      switchMap(id => this.contactsService.retrieveById(id as number))
    )
  }

  ngOnInit(): void {
  }

  onBack(){
    this.navigation.back()
  }

  onSave(contact: Contact) {
    this.contactsService.updateContact(contact)
    .subscribe(()=>this.navigation.back())
  }

}
