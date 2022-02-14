import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OfferRoutingModule} from './offer-routing.module';

import {SharedModule} from '../shared/shared.module';
import { ApplyOfferComponent } from './apply-offer/apply-offer.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { ListOfferComponent } from './list-offer/list-offer.component';
import {AuthService} from '../auth/auth.service';
import {OfferService} from './offer.service';
import {OffferGuard} from './offfer.guard';


@NgModule({
  declarations: [ApplyOfferComponent, CreateOfferComponent, EditOfferComponent, ListOfferComponent],
  imports: [
    CommonModule,
      SharedModule,
      OfferRoutingModule
  ],
  providers: [
    AuthService,
    OfferService,
    OffferGuard
  ]
})
export class OfferModule { }
