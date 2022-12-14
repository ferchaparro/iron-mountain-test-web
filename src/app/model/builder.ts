import { ReqConfigBuilder } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class Builder{
  reqConfigBuilder<T>(){
    return new ReqConfigBuilder<T>();
  }
}
