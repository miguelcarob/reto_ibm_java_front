import {NgModule} from '@angular/core';

import {OfertasRoutingModule} from './ofertas-routing.module';

import {SharedModule} from '../shared/shared.module';
import {OfertasService} from './ofertas.service';
import {AuthService} from '../auth/auth.service';
import {OfertasGuard} from './ofertas.guard';
import {OfertasComponent} from './createOfferts/ofertas.component';



@NgModule({
  declarations: [
    OfertasComponent,

  ],
  imports: [
    SharedModule,
    OfertasRoutingModule,
  ],
  providers: [
    AuthService,
    OfertasService,
    OfertasGuard
  ]
})
export class OfertasModule {
}
