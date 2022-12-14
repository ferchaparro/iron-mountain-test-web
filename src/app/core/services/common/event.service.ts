import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class EventService {
  eventManager: {[any: string]: Subject<any>} = {};
  constructor() {
  }

  register<T>(event:string): Observable<T> {
    let subject = new Subject<T>();
    this.eventManager[event] = subject;
    return subject.asObservable();
  }

  emmit<T>(event: string, value: T): void {
    (this.eventManager[event] as Subject<T>)?.next(value);
  }

  unsubscribe(event: string): void {
    this.eventManager[event].unsubscribe();
    delete this.eventManager[event];
  }
}
