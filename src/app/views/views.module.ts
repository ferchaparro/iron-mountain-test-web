import { NgModule } from '@angular/core'
import {MainComponent} from "./main"
import {P404Component} from "./404"
import {RoutingModule} from "./"
import {LoginComponent} from "./login"
import {MatCardModule} from "@angular/material/card"
import {CommonModule} from "@angular/common"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from "@angular/material/icon"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatListModule} from "@angular/material/list"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatMenuModule} from "@angular/material/menu"
import {MatDialogModule} from "@angular/material/dialog"
import {MatSelectModule} from "@angular/material/select"
import {A11yModule} from "@angular/cdk/a11y"
import {TranslateModule} from "@ngx-translate/core"
import { MatSnackBarModule } from '@angular/material/snack-bar'


@NgModule({
  declarations: [
    MainComponent,
    P404Component,
    LoginComponent
  ],
  imports: [RoutingModule, CommonModule, FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule, 
    A11yModule,
    TranslateModule
  ],
  entryComponents: [],
})
export class ViewsModule { }
