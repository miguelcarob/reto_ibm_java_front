import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowMoviesComponent} from './showMovies/showMovies.component';
import {ListComponent} from './listMovies/list.component';
import {MoviesGuard} from './movies.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listMovies',
    pathMatch: 'full'
  },
  {
    path: 'showMovies/:id',
    component: ShowMoviesComponent,
    canActivate: [MoviesGuard],
  },
  {
    path: 'listMovies',
    component: ListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {
}
