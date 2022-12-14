export interface ReqConfig<T> {
  reportProgress: boolean
  responseType: any
  url: string
  body?: T
  file?: File
  files?: File[]
  messageType: MessageType
  showMessage: boolean
  redirect: boolean
}

export enum MessageType {
  ALERT,
  TOAST
}

export class ReqConfigBuilder<T> {
  private _reportProgress: boolean
  private _responseType: any
  private _url: string
  private _body?: T
  private _file?: File
  private _files?: File[]
  private _messageType: MessageType
  private _showMessage: boolean
  private _redirect: boolean

  constructor(){
    this._reportProgress = false
    this._responseType = 'json'
    this._url = ''
    this._messageType = MessageType.ALERT
    this._showMessage = true
    this._redirect = false
  }

  reportProgress(reportProgress: boolean) {
    this._reportProgress = reportProgress
    return this
  }

  responseType(responseType: any) {
    this._responseType = responseType
    return this
  }

  url(url: string) {
    this._url = url
    return this
  }

  body(body: T){
    this._body = body
    return this
  }

  file(file: File){
    this._file = file
    return this
  }

  files(files: File[]){
    this._files = files
    return this
  }

  messageType(messageType: MessageType){
    this._messageType = messageType
    return this
  }

  showMessage(showMessage: boolean) {
    this._showMessage = showMessage
    return this
  }

  redirect(redirect: boolean) {
    this._redirect = redirect
    return this
  }

  build(): ReqConfig<T>{
    return {
      reportProgress: this._reportProgress,
      responseType: this._responseType,
      url: this._url,
      body: this._body,
      file: this._file,
      files: this._files,
      messageType: this._messageType,
      showMessage : this._showMessage,
      redirect: this._redirect
    }
  }
}
