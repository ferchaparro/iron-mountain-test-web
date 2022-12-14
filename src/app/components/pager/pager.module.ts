import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import {PagerComponent} from "./pager.component"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatBadgeModule} from "@angular/material/badge"

@NgModule({
  imports: [CommonModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatToolbarModule, MatBadgeModule],
  declarations: [PagerComponent],
  exports: [PagerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagerModule {}
