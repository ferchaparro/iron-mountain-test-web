import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core'

import { MainRoutingModule } from './'

import { HomeComponent } from './home'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import {MatMenuModule} from "@angular/material/menu"
import {MatTableModule} from "@angular/material/table"
import {MatInputModule} from "@angular/material/input"
import {MatDividerModule} from "@angular/material/divider"
import {MatRippleModule} from "@angular/material/core"
import { ContactsComponent } from './contacts/contacts.component'
import { PagerModule } from 'src/app/components/pager'
import { MatSortModule } from '@angular/material/sort'
import { TranslateModule } from '@ngx-translate/core';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component'
import { ContactFormModule } from 'src/app/components/contact-form';
import { ImportComponent } from './import/import.component'
import { FileUploadModule } from 'src/app/components/file-upload/file-upload.module'

@NgModule({
    imports: [MainRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, 
      MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, 
      MatTableModule, MatMenuModule, 
      MatDividerModule, MatRippleModule, PagerModule, MatSortModule,
      TranslateModule, ContactFormModule, FileUploadModule
    ],
  exports: [],
  declarations: [
    HomeComponent,
    ContactsComponent,
    NewContactComponent,
    EditContactComponent,
    ImportComponent
  ]
})
export class MainModule {}
