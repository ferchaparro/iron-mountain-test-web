import { Injectable, TemplateRef } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ComponentType } from '@angular/cdk/portal';


@Injectable({providedIn: 'root'})
export class SnackBarService {

  constructor(private toast: MatSnackBar) {}

  show(type: string, message: string, actionText: string, duration: number) {
    let toastRef = this.toast.open(message, actionText, {
      duration,
      data: { confirm, message, type, actionText }
    });
    return toastRef.onAction();
  }

  showCustomComponent<T>(componentRef: ComponentType<T>,duration: number, data: any) {
    let toastRef = this.toast.openFromComponent(componentRef, {
      duration, data
    });
    return toastRef.onAction();
  }

  showCustomTemplate<T>(templateRef: TemplateRef<T>, duration:number, data: any) {
    let toastRef = this.toast.openFromTemplate(templateRef, {
      duration, data
    });
    return toastRef.onAction();
  }

}
