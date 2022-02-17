import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ActorComponent}  from './actor/actor.component';
import {CinemaComponent}  from './cinema/cinema.component';
import {CategoryComponent}  from './category/category.component';
import {DirectorComponent}  from './director/director.component';
import {MoviesComponent} from './movies/movies.component';

import {ManagmentGuard} from './managment.guard';
import {from} from 'rxjs';

const routes: Routes = [
  {
    path: '',
    redirectTo: '../movies',
    pathMatch: 'full'
  },
  {
    path: 'actor',
    component: ActorComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    // canActivate: [ManagmentGuard],
  },
  {
    path: 'director',
    component: DirectorComponent,
    // canActivate: [ManagmentGuard],
  },{
    path: 'cinema',
    component: CinemaComponent,
    // canActivate: [ManagmentGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagmentRoutingModule {
}
