import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {combineLatest, MonoTypeOperatorFunction, Observable, of, OperatorFunction} from "rxjs";
import {catchError, debounceTime, delay, distinctUntilChanged, filter, map, tap} from "rxjs/operators";

export class FormValidator {
  static formSetErrors(form: FormGroup, errors: ValidationErrors|null, ...properties:string[]): ValidationErrors|null {
    properties.forEach(property=>form.get(property)?.setErrors(errors));
    return errors;
  }

  /**
   * Create AsyncValidatorFn For ReactiveForm.
   * @param _switchMap switchMap operator that transform to result of validation.
   * @param _filter filter operator that filter fields values to execute validation. default is value must have truthy value to execute. it will be executed before than switchMap.
   * @param _map map operator to convert switchMap value to ValidateError value. default is {exist:boolean}
   * @returns AsyncValidatorFn to include on FormGroup declaration properties.
   */
  static createFieldValidator<IN, OUT>(_switchMap: OperatorFunction<IN, OUT>,
                                       _filter?: MonoTypeOperatorFunction<IN>|null,
                                       _map?: OperatorFunction<OUT, ValidationErrors|null>| null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        (_filter?_filter:filter((value: IN) => !!value)),
        distinctUntilChanged(),
        _switchMap,
        (_map?_map:map(exist => (exist ? {exist: true} : null))),
        catchError(() => of(null))
      );
    };
  }

  /**
   * Create AsyncValidatorFn For ReactiveForm.
   * @param _switchMap switchMap operator that transform to result of validation.
   * @param _filter filter operator that filter fields values to execute validation. default is value must have truthy value to execute. it will be executed before than switchMap.
   * @param _map map operator to convert switchMap value to ValidateError value. default is {exist:boolean}
   * @returns AsyncValidatorFn to include on FormGroup declaration properties.
   */
  static createFieldSyncValidator<IN, OUT>(_switchMap: (value:IN) => OUT,
                                       _filter?: ((value:IN) => boolean)|null,
                                       _map?: ((exist: OUT)=> ValidationErrors|null)|null): ValidatorFn {
    return (control: AbstractControl): (ValidationErrors | null) => {
      if(_filter?_filter.call(this, control.value): !!control.value) {
        let exist = _switchMap.call(this, control.value);
        return _map?_map.call(this, exist):(exist ? {exist: true} : null);
      }
      return null;
    };
  }

  /**
   * Create default Observable validator for events$ and mark as error the fields on form.
   * @param form used to mark fields as error.
   * @param fields are the fields that will set as error.
   * @param events$ event Observable list.
   * @param _switchMap switchMap operator that transform to result of validation.
   * @param _filter filter operator that filter fields values to execute validation. default is all values must have truthy value to execute. it will be executed before than switchMap.
   * @param _map map operator to convert switchMap value to ValidateError value. default is {exist:boolean}
   * @returns Observable from ValidationError to execute on component.
   */
  static createMultiFieldValidator<IN, OUT>(form: FormGroup, fields: string[], events$: Observable<ValidationErrors|null>[],
                                            _switchMap: OperatorFunction<(IN)[], OUT>,
                                            _filter?: MonoTypeOperatorFunction<any[]>|null,
                                            _map?: OperatorFunction<OUT, ValidationErrors|null> | null) : Observable<ValidationErrors|null> {
    return combineLatest(events$)
      .pipe(
        debounceTime(500),
        (_filter?_filter:filter<any[]>(values => values.map(value=>!!value).reduce((prev, current)=>prev&&current))),
        distinctUntilChanged(),
        _switchMap,
        (_map?_map:map(exist => (exist ? {exist: true} : null))),
        tap(error => this.formSetErrors(form, error, ...fields))
      )
  }
}
