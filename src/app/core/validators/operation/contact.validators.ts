import {FormValidator} from "../../../model/common";
import {AsyncValidatorFn} from "@angular/forms";
import {map, switchMap} from "rxjs/operators";
import { ContactsService } from "../../services/operation";

export class ContactValidators extends FormValidator {

  static curpValidator(service: ContactsService, id?: number): AsyncValidatorFn {
    return this.createFieldValidator<string, boolean>(switchMap(curp=> service.existByCURP(curp, id)));
  }

}
