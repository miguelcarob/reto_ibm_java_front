import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies/movies.component';
import { ActorComponent } from './actor/actor.component';
import { DirectorComponent } from './director/director.component';
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [MoviesComponent, ActorComponent, DirectorComponent, CategoryComponent],
  imports: [
    CommonModule
  ]
})
export class ManagmentModule { }
