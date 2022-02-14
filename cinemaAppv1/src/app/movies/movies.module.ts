import {NgModule} from '@angular/core';

import {MoviesRoutingModule} from './movies-routing.module';

import {SharedModule} from '../shared/shared.module';
import {ShowMoviesComponent} from './showMovies/showMovies.component';
import {MoviesService} from './movies.service';
import {AuthService} from '../auth/auth.service';
import {ListComponent} from './listMovies/list.component';
import {MoviesGuard} from './movies.guard';


@NgModule({
  declarations: [
    ShowMoviesComponent,
    ListComponent,
  ],
  imports: [
    SharedModule,
    MoviesRoutingModule,
  ],
  providers: [
    AuthService,
    MoviesService,
    MoviesGuard
  ]
})
export class MoviesModule {
}
