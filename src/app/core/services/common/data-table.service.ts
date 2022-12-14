import {Injectable} from "@angular/core";
import {CommonService} from "./common.service";
import {Builder} from "../../../model";
import {Observable, OperatorFunction} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {debounceTime, map, startWith} from "rxjs/operators";
import { Page } from "src/app/components/pager/model/page.model";

@Injectable({providedIn: 'root'})
export class DataTableService {
  constructor(private commonService: CommonService, private builder: Builder) {}

  retrieveData(url: string, sort: string, order: string, page: number, pageSize: number, filter: any): Observable<any> {
    let filters: string = '';
    for(let key in filter) {
      filters = filters.concat('&', key, '=', filter[key]);
    }
    return this.commonService.doGet<any>(this.builder.reqConfigBuilder()
      .url(`${url}?sort=${sort}&order=${order}&page=${page}&size=${pageSize}${filters}`)
      .build());
  }

  createDataAction<T>(merge: Observable<Sort | PageEvent | void>, _switchMap: OperatorFunction<Observable<void>, Page<T>>): Observable<Page<T>> {
    return merge.pipe(
      debounceTime(300),
      startWith({} as any),
      _switchMap,
      map(data => {
        if (data === null) {
          return {content: [], totalElements: 0} as Page<T>;
        }
        return data;
      }));
  }
}
