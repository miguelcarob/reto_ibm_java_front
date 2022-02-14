import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../movies.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-list-movie.model.ts',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  // -----------------------------------------------------------------------------------------------------
  // @ Attributes
  // ----------------------------------------------------------------------------------------------------

  listMovies: any[];

  // -----------------------------------------------------------------------------------------------------
  // @ Constructor
  // ----------------------------------------------------------------------------------------------------

  constructor(
    private _dashboardService: MoviesService,
    private _authService: AuthService
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Life Cycle
  // ----------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.getAllMovies();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // ----------------------------------------------------------------------------------------------------



  getAllMovies(): void {
    this._dashboardService.getAllMovies().subscribe((response) => {
          this.listMovies = response;
          console.log(response);
          for (const m in response) {
            console.log(response[m].descriptionFilm);
      }
        }, (error) => {
          console.error(error, 'Ha ocurrido un error.');
        }
    )
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // ----------------------------------------------------------------------------------------------------







  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // ----------------------------------------------------------------------------------------------------

  getFavoriteVideoGames(): void {
   /* this._dashboardService.getMyFavoriteVideogames(this._authService.userLocalStorage.cod_usuario).subscribe((response) => {
        console.log('success:', response);

        if ((typeof response.message) === 'object') {
          this.myListFavoriteVideogames = response.message;
        } else {
          this.myListFavoriteVideogames = [];
        }
      }, (error) => {
        console.error(error, 'Ha ocurrido un error.');
      }
    )*/
  }

  dislikeVideogame(videogame: any, index: any): void {
/*    if (this.myListFavoriteVideogames[index].Puntuacion === -1) {
      this.myListFavoriteVideogames[index].Puntuacion = 0;
      this._dashboardService.rateVideogame(
        this._authService.userLocalStorage.cod_usuario,
        videogame.Num,
        0
      ).subscribe((response) => {
        console.log('response', response);
      });
    } else {
      this.myListFavoriteVideogames[index].Puntuacion = -1;
      this.myListFavoriteVideogames[index].isSelected = false;
      this._dashboardService.rateVideogame(
        this._authService.userLocalStorage.cod_usuario,
        videogame.Num,
        -1
      ).subscribe((response) => {
        console.log('response', response);
      });
    }*/
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // ----------------------------------------------------------------------------------------------------


}
