import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {tap} from 'rxjs/operators';


@Injectable()
export class OfferService {

  // -----------------------------------------------------------------------------------------------------
  // @ Attributes
  // ----------------------------------------------------------------------------------------------------
  private readonly API_URL = environment.apiUrl;


  // -----------------------------------------------------------------------------------------------------
  // @ Constructor
  // -----------------------------------------------------------------------------------------------------

  constructor(private _http: HttpClient) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // ----------------------------------------------------------------------------------------------------

  getAllOffers(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'offer/');
  }


}
