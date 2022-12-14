
import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from "@angular/material/table";
import {TotalWeightPipe} from "./total-weight.pipe";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatTableModule, TranslateModule],
  entryComponents: [FileUploadComponent],
  declarations: [FileUploadComponent, TotalWeightPipe],
  exports: [FileUploadComponent]
})
export class FileUploadModule {}
