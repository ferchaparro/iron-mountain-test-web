import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Page } from "src/app/components/pager/model/page.model"
import { Builder } from "src/app/model"
import { MessageResponse } from "src/app/model/common"
import { MessageType } from "src/app/model/http"
import { Contact } from "src/app/model/operation/contact.model"
import { CommonService } from "../common"

@Injectable({providedIn: 'root'})
export class ContactsService {
    constructor(private commonService: CommonService, private builder: Builder){}

    retrieveContacts(sort: string, order: string, page: number, pageSize: number, filter: string): Observable<Page<Contact>> {
        let _filter;
        if(!!filter) {
            _filter = this.commonService.transformFilter([{key:'filter', value: filter}])
        }
        return this.commonService.doGet<Page<Contact>>(this.builder.reqConfigBuilder()
          .url(`v1/contacts/paged?sort=${sort}&order=${order}&page=${page}&size=${pageSize}${_filter||''}`)
          .build())
    }

    retrieveById(id: number): Observable<Contact> {
        return this.commonService.doGet<Contact>(this.builder.reqConfigBuilder()
        .url(`v1/contacts/by-id/${id}`)
        .build())
    }

    existByCURP(curp: string, id: number = undefined) {
        let _id;
        if(!!id) {
            _id = this.commonService.transformFilter([{key:'id', value: id}])
        }
        return this.commonService.doGet<boolean>(this.builder.reqConfigBuilder()
        .url(`v1/contacts/by-curp?curp=${curp}${_id||''}`)
        .build())
    }

    createContact(contact: Contact): Observable<void> {
        return this.commonService.doPost<Contact, MessageResponse<number>>(this.builder.reqConfigBuilder<Contact>()
        .url('v1/contacts/save')
        .body(contact)
        .messageType(MessageType.TOAST)
        .build())
        .pipe(map(() => null))
    }

    updateContact(contact: Contact): Observable<void> {
        return this.commonService.doPut<Contact, MessageResponse<number>>(this.builder.reqConfigBuilder<Contact>()
        .url('v1/contacts/update')
        .body(contact)
        .messageType(MessageType.TOAST)
        .build())
        .pipe(map(() => null)) 
    }

    deleteContact(id: number): Observable<void> {
        return this.commonService.doDelete<MessageResponse<void>>(this.builder.reqConfigBuilder()
        .url(`v1/contacts/by-id/${id}`)
        .messageType(MessageType.TOAST)
        .build())
        .pipe(map(() => null)) 
    }

    uploadFile(file: File): Observable<MessageResponse<{toSave: number, omitted: number}>> {
        return this.commonService.doPostFile<any, MessageResponse<{toSave: number, omitted: number}>>(this.builder.reqConfigBuilder<any>()
        .url('v1/contacts/upload')
        .file(file)
        .showMessage(false)
        .build())
    }
}