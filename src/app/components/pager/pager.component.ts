import {Component, EventEmitter, Injectable, Input, Output, ViewChild} from "@angular/core"
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator"
import {Subject} from "rxjs"
import {TranslateService} from "@ngx-translate/core"

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  constructor(private translateService: TranslateService) {}
  changes = new Subject<void>();
  firstPageLabel = this.translateService.instant('PAGER.FIRST_PAGE')
  itemsPerPageLabel = this.translateService.instant('PAGER.ITEMS_PER_PAGE')
  lastPageLabel = this.translateService.instant('PAGER.LAST_PAGE')
  nextPageLabel = this.translateService.instant('PAGER.NEXT_PAGE')
  previousPageLabel = this.translateService.instant('PAGER.PREVIOUS_PAGE')

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translateService.instant('PAGER.PAGE_OF', {cuttent: 1, total: 1})
    }
    const amountPages = Math.ceil(length / pageSize)
    return this.translateService.instant('PAGER.PAGE_OF', {current: page + 1, total: amountPages})
  }
}

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['pager.component.scss'],
  providers: [
    {provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}
  ]
})
export class PagerComponent {
  @Input() resultsLength = 0
  @Input() pageSize = 10
  @Input() pageSizeOptions = [10, 25, 50, 100, 1000]
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>()
  @Output() filter: EventEmitter<void> = new EventEmitter<void>()

  constructor() {

  }




}
