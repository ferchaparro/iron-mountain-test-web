import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatInputModule} from "@angular/material/input"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ContactFormComponent } from "./contact-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, 
        MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule,
        TranslateModule
    ],
    declarations: [ContactFormComponent],
    exports: [ContactFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactFormModule{}