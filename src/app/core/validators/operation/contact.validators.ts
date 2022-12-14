import {FormValidator} from "../../../model/common";
import {AsyncValidatorFn} from "@angular/forms";
import {map, switchMap} from "rxjs/operators";
import { ContactsService } from "../../services/operation";

export const CURP_REGEX = /^[A-Za-z]{1}[AEIOUaeiou]{1}[A-Za-z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HMhm]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE|as|bc|bs|cc|cs|ch|cl|cm|df|dg|gt|gr|hg|jc|mc|mn|ms|nt|nl|oc|pl|qt|qr|sp|sl|sr|tc|ts|tl|vz|yn|zs|ne)[B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z]{3}[0-9A-Za-z]{1}[0-9]{1}$/
export const PHONE_REGEX = /^(\+(1|52)[ -]?)?([1-9])([0-9]{2}[ -]?)([0-9]{3}[ -]?)([0-9]{4})$/
export class ContactValidators extends FormValidator {

  static curpValidator(service: ContactsService, id?: number): AsyncValidatorFn {
    return this.createFieldValidator<string, boolean>(switchMap(curp=> service.existByCURP(curp, id)));
  }

}
