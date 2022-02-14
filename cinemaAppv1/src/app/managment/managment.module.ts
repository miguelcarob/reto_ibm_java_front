import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ManagmentRoutingModule} from './managment-routing.module';
import {MaterialModule} from '../shared/material.module';
import { MoviesComponent } from './movies/movies.component';
import { ActorComponent } from './actor/actor.component';
import { DirectorComponent } from './director/director.component';
import { CategoryComponent } from './category/category.component';
import { CinemaComponent } from './cinema/cinema.component';
import {AuthService} from '../auth/auth.service';
import {ManagmentService} from './managment.service';
import {ManagmentGuard} from './managment.guard';
import {SharedModule} from '../shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule } from '@angular/material/paginator';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [MoviesComponent, ActorComponent, DirectorComponent, CategoryComponent, CinemaComponent],
  imports: [
    CommonModule, ManagmentRoutingModule, SharedModule, DataTablesModule, MatIconModule, MatTableModule, MatSortModule, MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule, FormsModule,
  ],
  providers: [
    AuthService,
    ManagmentService,
    ManagmentGuard
  ],exports:[MatTableModule,DataTablesModule,MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,]
})
export class ManagmentModule { }
