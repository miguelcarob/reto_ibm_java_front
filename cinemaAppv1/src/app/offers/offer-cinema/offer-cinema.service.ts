import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {catchError, retry, tap} from 'rxjs/operators';
import {Offer} from '../../shared/models/offer.model';



@Injectable()
export class OfferCinemaService {
    // -----------------------------------------------------------------------------------------------------
    // @ Attributes
    // ----------------------------------------------------------------------------------------------------
    private readonly API_URL = environment.apiUrl+'offer/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
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

    createItem(item):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type','application/json');
        console.log(item);
        return this._http.post(this.API_URL , JSON.stringify(item),{headers});
    }

    getItem(id):Observable<any>{
        return this._http.get<any>(this.API_URL + '/'+id);
    }

    getList( cinema:number):Observable<Offer[]>{
        return this._http.get<Offer[]>(this.API_URL + 'cinema/'+cinema);
    }
    // Handle API errors
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    updateItem(item:Offer) :Observable<any>{
        console.log(item);
        const headers = new HttpHeaders().set('Content-Type','application/json');
        console.log('Linea 68');
        console.log(item);
        return this._http.put(this.API_URL , JSON.stringify(item),{headers});
    }


    deleteItem(id:number):Observable<any> {
        console.log("entro con el id "+id)
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.API_URL +id,{headers});
    }
}
