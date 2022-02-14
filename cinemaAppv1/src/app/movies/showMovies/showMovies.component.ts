import {Component, Input, OnInit,OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MoviesService} from '../movies.service';
import {AuthService} from '../../auth/auth.service';
import {Movie} from '../../shared/models/movie.model';



@Component({
    selector: 'app-show-movies',
    templateUrl: './showMovies.component.html',
    styleUrls: ['./showMovies.component.css']
})
export class ShowMoviesComponent implements OnInit {


    // -----------------------------------------------------------------------------------------------------
    // @ Attributes
    // ----------------------------------------------------------------------------------------------------

    information: any[];

    // -----------------------------------------------------------------------------------------------------
    // @ Constructor
    // ----------------------------------------------------------------------------------------------------
    private id: string;
    private sub;
    public movFinal;

    constructor(
        private _Activatedroute: ActivatedRoute,
        private _router: Router,
        private _dashboardService: MoviesService,
        private _authService: AuthService,
        private _moviesService:MoviesService
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Life Cycle
    // ----------------------------------------------------------------------------------------------------

    ngOnInit() {
        this._Activatedroute.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.loadInformation(this.id);
        });
        }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // ----------------------------------------------------------------------------------------------------

    loadInformation(id:string): void {
        this._moviesService.getMovie(id).subscribe((response) => {
                console.log(response);
                 this.movFinal=response;
            }, (error) => {
                console.error(error, 'Ha ocurrido un error.');
            }
        )
    }

    DirectorInformation():string{
        let devolver='';
        for ( const variable of this.movFinal.directorsFilms) {
            devolver+=variable.nameDirector+'  ';
        }
    return devolver;
    }

    categoryInformation():string{
        let devolver='';
        for ( const variable of this.movFinal.categoriesFilms) {
            devolver+=variable.nameCategory+'  ';
        }
        return devolver;
    }

    actorInformation():string{
        let devolver='';
        for ( const variable of this.movFinal.actorsFilms) {
            devolver+=variable.nameActor+'  ';
        }
        return devolver;
    }
}
