import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OfertasComponent} from './createOfferts/ofertas.component';
import {OfertasGuard} from './ofertas.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: OfertasComponent,
    canActivate: [OfertasGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertasRoutingModule {
}
