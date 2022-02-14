import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {catchError, retry, tap} from 'rxjs/operators';
import {Actor} from '../shared/models/actor.model';


@Injectable()
export class ManagmentService {

  // -----------------------------------------------------------------------------------------------------
  // @ Attributes
  // ----------------------------------------------------------------------------------------------------
  private readonly API_URL = environment.apiUrl;

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
    return this._http.post(this.API_URL + 'users/createSubscriber/', JSON.stringify(item),{headers});
  }

  getItem(id):Observable<any>{
    return this._http.get<any>(this.API_URL + 'actor/'+id);
  }

  getList():Observable<Actor[]>{
    return this._http.get<Actor[]>(this.API_URL + 'actor/');
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

  updateItem(id,item) :Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.API_URL + 'users/createSubscriber/', JSON.stringify(id),{headers});
  }


  deleteItem(id:number):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.API_URL + 'users/createSubscriber/', JSON.stringify(id),{headers});
  }
}
