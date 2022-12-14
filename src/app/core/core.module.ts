import { NgModule } from '@angular/core'
import { ServicesModule } from './services'
import { GuardsModule } from './guards/guards.module'
import { InterceptorsModule } from './interceptors'


@NgModule({
  imports: [
    ServicesModule,
    GuardsModule,
    InterceptorsModule
  ],
  declarations: [],
})
export class CoreModule {}
