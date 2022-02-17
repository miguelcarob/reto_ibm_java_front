import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OfferRoutingModule} from './offer-routing.module';


import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';


import { ApplyOfferComponent } from './apply-offer/apply-offer.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { ListOfferComponent } from './list-offer/list-offer.component';
import {OfferCinemaComponent} from './offer-cinema/offer-cinema.component';
import {AuthService} from '../auth/auth.service';
import {OffferGuard} from './offfer.guard';
import {OfferCinemaService} from './offer-cinema/offer-cinema.service';
import {OfferService} from "./offer.service";


@NgModule({
  declarations: [ApplyOfferComponent, CreateOfferComponent, EditOfferComponent, ListOfferComponent,OfferCinemaComponent],
  imports: [
    CommonModule,
      SharedModule,
      OfferRoutingModule,
    MaterialModule,MatIconModule,MatTableModule,MatSortModule,MatFormFieldModule,MatInputModule,MatPaginatorModule,FormsModule
  ],
  providers: [
    AuthService,
    OfferCinemaService,
    OffferGuard,
    OfferService,
    OfferCinemaComponent,
    MaterialModule,MatIconModule,MatTableModule,MatSortModule,MatFormFieldModule,MatInputModule,MatPaginatorModule,FormsModule
  ]
})
export class OfferModule { }
