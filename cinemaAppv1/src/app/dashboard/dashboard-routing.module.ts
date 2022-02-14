import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LikesComponent} from './likes/likes.component';
import {DashboardGuard} from './dashboard.guard';
import {TrendingComponent} from './trending/trending.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'showMovies',
    pathMatch: 'full'
  },
  {
    path: 'showMovies',
    component: HomeComponent,
    canActivate: [DashboardGuard],
  },
  {
    path: 'my-listMovies',
    component: LikesComponent,
    canActivate: [DashboardGuard],
  },
  {
    path: 'trending',
    component: TrendingComponent,
    canActivate: [DashboardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
