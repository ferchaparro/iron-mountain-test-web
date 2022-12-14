import { Component, EventEmitter, Input, Output } from "@angular/core";
import {CommunicationService, DialogService} from "../../core/services/common";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input()
  accept: string = "text/csv"
  @Input()
  placeholderText: string = 'FILE_UPLOADER.PLACEHOLDER';
  @Input()
  maxSize: number = 30*1024*1024;
  @Input()
  maxFiles: number = 1;

  private _files: File[] = [];
  @Input()
  set files(value: File[]) {
    this._files = value;
  }
  get files(): File[] {
    return this._files;
  }
  @Output()
  filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();
  overZone = false;
  processing: boolean;
  displayedColumns: string[] = ['position', 'name', 'weight', 'delete'];

  constructor(private dialog: DialogService, private communication: CommunicationService){}

  dropFile(event) {
    event.preventDefault();
    event.stopPropagation();
    if(event.dataTransfer.files){
      this.loadFiles(event.dataTransfer.files)
    } else {
      this.overZone = false;
    }
  }

  loadFiles(event: any|FileList) {
    this.processing = true;
    this.overZone = false;

    if (event instanceof FileList) {
      event = {target: {files: event}};
    }
    const fileList: FileList = event.target.files;
    const files: File[] = []
    for(let i = 0;i<fileList.length;i++){
      files.push(fileList[i]);
    }

    const totalSize = files.map(f => f.size)
      .reduce((a,b) => a+b, 0) + this.files.map(f => f.size)
      .reduce((a,b) => a+b, 0);
    const totalFiles = files.length + this.files.length;

    if(totalSize>this.maxSize){
      this.communication.toast('FILE_SIZE_LIMIT_ALERT',  { maxSize: (this.maxSize/1024)/1024 })
      return;
    }

    if(totalFiles>this.maxFiles) {
      this.communication.toast('FILE_LIMIT_ALERT',  { max: this.maxFiles })
      return;
    }

    files.forEach(file => {
      this.files = [...this.files, file]
        this.filesChange.emit(this.files);
    })

  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.files = [...this._files];
    this.filesChange.emit(this.files);
  }

  clear(){
    this.files = [];
    this.filesChange.emit(this.files);
  }

}
