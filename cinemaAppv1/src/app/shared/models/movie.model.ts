import {Actor} from './actor.model';
import {Category} from './category.model';
import {Director} from './director.model';

export class Movie {
    id:number;
    titleFilm:string;
    descriptionFilm:string;
    releaseDateFilm:Date;
    actorsFilms:Actor[];
    categoryFilms:Category[];
    directorFilms:Director[];
}