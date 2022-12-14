import { NgModule} from '@angular/core'
import { Routes, RouterModule  } from '@angular/router'
import { MainComponent } from './main'
import { LoginComponent } from './login'
import { P404Component } from './404'
import { AuthGuard, LoginGuard } from 'src/app/core/guards'

const routes: Routes = [
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: '404', component: P404Component },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      }
    ]
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class RoutingModule { }
