import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {tap} from 'rxjs/operators';


@Injectable()
export class MoviesService {

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

  getAllMovies(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'film/');
  }


  getMovie(id: string): Observable<any> {
    return this._http.get<any>(this.API_URL + 'film/'+id);
  }

  rateVideogame(codUser: number, codVideogame: number, puntuacion: number): Observable<any> {
    return this._http.post<any>(this.API_URL + 'peliculas/',
      {
        usuario: codUser,
        juegos: [{
          Num: codVideogame,
          Puntuacion: puntuacion
        }]
      });
  }

}
