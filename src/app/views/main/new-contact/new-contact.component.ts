import { Component, OnInit } from '@angular/core'
import { NavigateService } from 'src/app/core/services/common'
import { ContactsService } from 'src/app/core/services/operation'
import { Contact } from 'src/app/model/operation/contact.model'

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  constructor(private navigation: NavigateService, private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  onBack(){
    this.navigation.back()
  }

  onSave(contact: Contact) {
    this.contactsService.createContact(contact)
    .subscribe(()=>this.navigation.back())
  }

}
