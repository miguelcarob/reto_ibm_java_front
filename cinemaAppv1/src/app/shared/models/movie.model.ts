import {Actor} from './Actor.model';
import {Category} from './Category.model';
import {Director} from './director.model';

export interface Movie {
    id:number,
    titleFilm:string,
    descriptionFilm:string,
    releaseDateFilm:string,
    actorsFilms:Actor[],
    categoryFilms:Category[],
    directorFilms:Director[]
}