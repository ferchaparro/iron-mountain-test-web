
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, LoginGuard } from './';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthGuard, LoginGuard],
})
export class GuardsModule {}
