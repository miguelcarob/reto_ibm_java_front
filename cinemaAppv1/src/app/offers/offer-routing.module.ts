import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListOfferComponent} from './list-offer/list-offer.component';
import {CreateOfferComponent} from './create-offer/create-offer.component'
import {EditOfferComponent} from './edit-offer/edit-offer.component';
//
import {OffferGuard} from './offfer.guard';
import {OfferCinemaComponent} from './offer-cinema/offer-cinema.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListOfferComponent,
  },
  {
    path: 'cinemaOffer',
    component: OfferCinemaComponent,
  },
  {
    path: 'cinema',
    component: CreateOfferComponent,
    canActivate: [OffferGuard],
  },
  {
    path: 'create',
    component: CreateOfferComponent,
    canActivate: [OffferGuard],
  },
  {
    path: 'edit/:id',
    component: EditOfferComponent,
    canActivate: [OffferGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {
}
