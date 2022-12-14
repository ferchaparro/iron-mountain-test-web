import { Injectable, TemplateRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ComponentType } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';
import { AlertDialogComponent } from 'src/app/components/alert-dialog';


@Injectable({providedIn: 'root'})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  show(confirm: boolean, type: string, message: string[] | string, showTitle: boolean, title: string, okButtonText: string, cancelButtonText?: string) : {onAccept: Observable<void>, onCancel: Observable<void>|undefined} {
    if(typeof message === "string") {
      message = [message as string];
    }
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
      data: { confirm, message, type, title, showTitle, okButtonText, cancelButtonText }
    });
    const onAcceptSubject: Subject<void> = new Subject<void>();
    const onCancelSubject: Subject<void>|undefined = confirm ? new Subject<void>(): undefined;
    dialogRef.afterClosed().subscribe((result => {
      if(result){
        onAcceptSubject.next();
      } else{
        if(confirm) onCancelSubject?.next();
      }

    }));
    return {
      onAccept: onAcceptSubject.asObservable(),
      onCancel: onCancelSubject?.asObservable()
    };
  }

  showCustom<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, data: any, width?: string) {
    let dialogRef = this.dialog.open(componentOrTemplateRef, {
      width,
      closeOnNavigation: false,
      disableClose: true,
      data
    });
    return dialogRef.afterClosed();
  }

  showCustomClosable<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, data: any, width?: string, height?: string): Observable<any> {
    let dialogRef = this.dialog.open(componentOrTemplateRef, {
      width,
      panelClass: "nobg",
      closeOnNavigation: false,
      disableClose: true,
      data
    });

    return dialogRef.afterClosed();
  }

  showCustomClosableOnNavigation<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, data: any, width?: string, height?: string): Observable<any> {
    let dialogRef = this.dialog.open(componentOrTemplateRef, {
      width,
      height,
      panelClass: ['nobg', 'max-80'],
      closeOnNavigation: true,
      disableClose: false,
      data
    });

    return dialogRef.afterClosed();
  }

}
