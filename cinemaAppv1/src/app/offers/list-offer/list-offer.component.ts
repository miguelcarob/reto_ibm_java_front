import {Component, OnInit} from '@angular/core';
import {OfferService} from '../offer.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-list-offer',
    templateUrl: './list-offer.component.html',
    styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {


    listOffers: any[];

    constructor(
        private _offerService: OfferService,
        private _authService: AuthService
    ) {
}

    ngOnInit() {
        this.setListOffers();
    }

    setListOffers():void {
    this._offerService.getAllOffers().subscribe((response) => {
            this.listOffers = response;

        }, (error) => {
            console.error(error, 'Ha ocurrido un error.');
        }
    )
}
}
