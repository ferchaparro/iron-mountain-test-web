import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ContactsComponent } from './contacts/contacts.component'
import { EditContactComponent } from './edit-contact/edit-contact.component'

import { HomeComponent } from './home'
import { ImportComponent } from './import/import.component'
import { NewContactComponent } from './new-contact/new-contact.component'

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    data: {
      title: 'Contactos'
    }
  },
  {
    path: 'new',
    component: NewContactComponent,
    data: {
      title: 'Contactos'
    }
  },
  {
    path: 'edit/:id',
    component: EditContactComponent,
    data: {
      title: 'Contactos'
    }
  },
  {
    path: 'import',
    component: ImportComponent,
    data: {
      title: 'Importar contactos'
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
