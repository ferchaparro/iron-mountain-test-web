import { Injectable } from '@angular/core'
import { DialogService } from './dialog.service'
import { Observable } from 'rxjs'
import { SnackBarService } from './snack-bar.service'
import {TranslateService} from "@ngx-translate/core";


@Injectable({providedIn: 'root'})
export class CommunicationService {

  constructor(private dialogService: DialogService, private toastService: SnackBarService, private translateService: TranslateService) {}

  alertSuccess(messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string) : {onAccept: Observable<void>, onCancel: Observable<void>}{
    return this.showDialog('primary', messageKey, customParams, titleKey, removeTitle, okButtonKey)
  }

  alertDanger(messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string) : {onAccept: Observable<void>, onCancel: Observable<void>}{
    return this.showDialog('warn', messageKey, customParams, titleKey, removeTitle, okButtonKey)
  }

  alertWarning(messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string) : {onAccept: Observable<void>, onCancel: Observable<void>}{
    return this.showDialog('accent', messageKey, customParams, titleKey, removeTitle, okButtonKey)
  }

  confirmSuccess(messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string, cancelButtonKey?: string) : {onAccept: Observable<void>, onCancel: Observable<void>}{
    return this.showConfirm('primary', messageKey, customParams, titleKey, removeTitle, okButtonKey, cancelButtonKey)
  }

  confirmDanger(messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string, cancelButtonKey?: string) : {onAccept: Observable<void>, onCancel: Observable<void>}{
    return this.showConfirm('warn', messageKey, customParams, titleKey, removeTitle, okButtonKey, cancelButtonKey)
  }

  toast(messageKey: string, customParams?: any, actionKey?: string, duration: number = 2000){
    return this.showToast(messageKey, customParams, actionKey, duration)
  }

  private showDialog(type: string, messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string) {
    return this._showDialog(false, type, messageKey, customParams, titleKey||'ALERT_TITLE', removeTitle, okButtonKey)
  }

  private showConfirm(type: string, messageKey: string|string[], customParams?: any, titleKey?: string, removeTitle?: boolean, okButtonKey?: string, cancelButtonKey?: string) {
    return this._showDialog(true, type, messageKey, customParams, titleKey||'CONFIRM_TITLE', removeTitle, okButtonKey, cancelButtonKey)
  }

  private showToast(messageKey: string, customParams?: any, actionKey?: string, duration: number = 2000) {
    return this._showToast('success', messageKey, customParams, actionKey, duration)
  }

  private _showDialog(confirm: boolean, type: string, messageKey: string|string[], customParams: any, titleKey: string, removeTitle?: boolean, okButtonKey?: string, cancelButtonKey?: string) {
    if(typeof messageKey === 'string') {
      messageKey = [messageKey]
    }
    const lines = messageKey.map(key => this._translate(key, customParams))
      .flatMap(el=>el)

    return this.dialogService.show(confirm, type, lines, !removeTitle, this._translateMakeSureSingle(titleKey), this._translateMakeSureSingle(okButtonKey||'OK_BUTTON'), this._translateMakeSureSingle(cancelButtonKey||'CANCEL_BUTTON'))
  }

  private _showToast(type: string, messageKey: string, customParams?: any, actionKey?: string, duration: number = 2000){
    return this.toastService.show(type, this._translateMakeSureSingle(messageKey, customParams), actionKey?this._translateMakeSureSingle(actionKey):undefined, duration)
  }

  private _translate(messageKey: string, customParams?: any): string[] | string {
    return this.translateService.instant(`MESSAGES.${messageKey}`, customParams)
  }

  private _translateMakeSureSingle(messageKey: string, customParams?: any) {
    let message = this._translate(messageKey, customParams)
    if(typeof message === "string") {
      message = [message as string]
    }
    return message.join(', ')
  }

}
