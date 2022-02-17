import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {User} from './auth.types';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class AuthService{


    private readonly API_URL =environment.apiUrl;

    serviceLoading = false;

    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get currentUser$(): Observable<any> {
        return this._currentUser.asObservable();
    }

    set currentUser(value: any) {
        this._currentUser.next(value);
    }

    get userLocalStorage(): any {
        return JSON.parse(localStorage.getItem('user_cinemaApp'));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    signIn(user: User): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http
            // .post(this.API_URL + 'users/login/', JSON.stringify(user),{headers:headers})
            .post(this.API_URL + 'users/login/', JSON.stringify(user),{headers})
            .pipe(
                tap((response) => {

                    if ('emailUserCinema' in response) {
                        user.user_table = response.user_table;
                        user.usernameUserCinema=response.usernameUserCinema;
                        user.typeUser=response.typeUser;
                        this._currentUser.next(user);
                        this._saveUserLocalStorage(user);
                        this._router.navigate(['./movies']);
                    } else {
                        console.error('Error usu y contraseña');
                    }

                })
            )
    }

    registerUser(user: User): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.API_URL + 'users/createSubscriber/', JSON.stringify(user),{headers});
    }
    clearSessionData(): void {
        this._currentUser.next(null);
        localStorage.removeItem('user_cinemaApp');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _saveUserLocalStorage(user: User): void {
        localStorage.setItem('user_cinemaApp',
            JSON.stringify({userTotal:user}));
    }

    checkAuthType(): number {
        const user = this.userLocalStorage;
        if (!user) {
            return 0;
        }
        return user.userTotal.typeUser;
    }

    checkIdTable(): number {
        const user = this.userLocalStorage;
        if (!user) {
            return 0;
        }
        return user.userTotal.user_table;
    }



    checkAuthStatus(): Observable<boolean> {
        const user = this.userLocalStorage;
        if (!user) {
            return of(false);
        }
        return of(true);
    }


}
