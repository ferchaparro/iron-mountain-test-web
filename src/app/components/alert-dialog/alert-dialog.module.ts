
import { NgModule } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  entryComponents: [AlertDialogComponent],
  declarations: [AlertDialogComponent],
})
export class AlertDialogModule {}
