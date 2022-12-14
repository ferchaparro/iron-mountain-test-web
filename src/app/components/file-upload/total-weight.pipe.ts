import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:'totalWeight'})
export class TotalWeightPipe implements PipeTransform {
  transform(files: File[]): any | any[] | string[] {
    return files.map(file => file.size)
      .reduce((a, b)=>a+b, 0);
  }
}
