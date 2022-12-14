import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/core/services/operation';
import { ContactValidators, CURP_REGEX, PHONE_REGEX } from 'src/app/core/validators/operation';
import { Contact } from 'src/app/model/operation/contact.model';


@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form: FormGroup
  @Input() contact: Contact
  @Input() hint: string = 'SAVE_HINT'
  @Output() onSave: EventEmitter<Contact> = new EventEmitter<Contact>()

  constructor(private fb: FormBuilder, private contactsService: ContactsService) { 
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(PHONE_REGEX)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      uniquePopulationRegistryCode: ['', [Validators.required, , Validators.maxLength(18), Validators.pattern(CURP_REGEX)], [ContactValidators.curpValidator(this.contactsService, this.contact?.id)]],
      creationDate: [''],
      lastUpdate: ['']
    })
    if(this.contact){
      this.setFormValues(this.contact)
    }
  }

  onSubmit({id, fullName, phone, address, uniquePopulationRegistryCode}) {
    if(!this.form.valid) {
      return
    }
    this.onSave.next({id, fullName, phone, address, uniquePopulationRegistryCode} as Contact)
  }

  setFormValues({id, fullName, phone, address, uniquePopulationRegistryCode, creationDate, lastUpdate}: Contact) {
    const browserLocale = navigator?.language
          const enLocale = browserLocale.includes('en')
          const langToSet = enLocale?'en':'es-MX'
    const datePipe = new DatePipe(langToSet)
    this.form.setValue({
      id, fullName, phone, address, uniquePopulationRegistryCode, 
      creationDate: datePipe.transform(creationDate), 
      lastUpdate: datePipe.transform(lastUpdate)
    })
  }

}
