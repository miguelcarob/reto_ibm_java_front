import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagmentRoutingModule} from './managment-routing.module';


import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';


import {MoviesComponent} from './movies/movies.component';
import {ActorComponent} from './actor/actor.component';
import {DirectorComponent} from './director/director.component';
import {CategoryComponent} from './category/category.component';
import {CinemaComponent} from './cinema/cinema.component';
import {AuthService} from '../auth/auth.service';
import {ManagmentService} from './managment.service';
import {ManagmentGuard} from './managment.guard';
import {ActorService} from './actor/actor.service';
import {DirectorService} from './director/director.service';
import {CategoryService} from './category/category.service';
import {CinemaService} from './cinema/cinema.service';
import {MoviesService} from './movies/movies.service';


@NgModule({
    declarations: [MoviesComponent, ActorComponent, DirectorComponent, CategoryComponent, CinemaComponent],
    imports: [
        CommonModule, ManagmentRoutingModule, SharedModule, MatIconModule, MatTableModule, MatSortModule, MaterialModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule, FormsModule,
    ],
    providers: [
        MoviesService,
        DirectorService,
        CategoryService,
        ActorService,
        CinemaService,
        AuthService,
        ManagmentService,
        ManagmentGuard
    ], exports: [MatTableModule, MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,]
})
export class ManagmentModule {
}
