import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { CommunicationService, NavigateService } from 'src/app/core/services/common';
import { ContactsService } from 'src/app/core/services/operation';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent
  file: File

  constructor(private navigation: NavigateService, private contactsService: ContactsService, private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  onBack(){
    this.navigation.back()
  }

  onFilesChange(files: File[]) {
    if(files?.length) {
      this.file = files[0]
    } else {
      this.file = undefined
    }
    
  }

  onClickUpload(file: File) {
    if(file) {
      this.contactsService.uploadFile(file)
      .subscribe(message=> {
        this.fileUpload.clear()
        this.file = undefined
        this.communicationService.alertSuccess(message.message, {toSave: message.data.toSave, omitted: message.data.omitted})
      })
    }
  }

}
