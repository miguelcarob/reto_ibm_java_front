import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {Cinema} from '../../shared/models/cinema.model';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm} from '@angular/forms';
import {NewCinema} from '../../shared/models/newCinema.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Movie} from '../../shared/models/movie.model';
import {NewMovie} from '../../shared/models/newMovie.model';
import {MoviesService} from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit,AfterViewInit {

  data: Movie[];
  displayedColumns = ['titleFilm','releaseDateFilm','imageFilm','edit','information','delete'];


  dataSource = new MatTableDataSource<Movie>();
  isEditMode = false;

  @ViewChild('entityForm', {static: false})
  entityForm: NgForm;
  entityData: NewMovie;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _movieService: MoviesService) {
    this.entityData = {} as NewMovie;
  }

  ngOnInit(): void {
    this.getAllEntity();
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllEntity() {
    this._movieService.getList().subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = response;
    });
    this.fiterPredicateAll();
  }

  public fiterPredicateAll(){
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  public doFilter = (value: string) => {
    console.log(this.dataSource);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  addEntity() {
    this.entityData.descriptionFilm=this.entityData.descriptionFilm+'$$$$'+this.entityData.imageFilm;
    console.log(this.entityData);
    this._movieService.createItem(this.entityData).subscribe((response: any) => {
      this.getAllEntity();
      this.entityData.titleFilm = '';
      this.entityData.imageFilm = '';
      this.entityData.descriptionFilm = '';
      this.entityData.releaseDateFilm = new Date();
    });
  }


  onSubmit() {
    if (this.entityForm.form.valid) {
      if (this.isEditMode)
        this.updateEntity()
      else
        this.addEntity();
    } else {
      console.log('Error en los datos ingresados');
    }
  }

  updateEntity() {
    const entityUpdate = new Movie();
    entityUpdate.descriptionFilm=this.entityData.descriptionFilm+'$$$$'+this.entityData.imageFilm;
    entityUpdate.titleFilm=this.entityData.titleFilm;
    entityUpdate.id=this.entityData.id;
    entityUpdate.releaseDateFilm=this.entityData.releaseDateFilm;
    this._movieService.updateItem(entityUpdate).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: Movie) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()

      this.cancelEdit()

    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.entityForm.resetForm();
  }

  deleteEntity(id) {
    this._movieService.deleteItem(id).subscribe((response: any) => {
      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: Movie) => {
        return o.id !== id ? o : false;
      })

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()
    });
  }

  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }

  editEntity(element) {
    this.entityData = _.cloneDeep(element);
    this.entityData.descriptionFilm=element.descriptionFilm.split('$$$$')[0];
    this.entityData.imageFilm=element.descriptionFilm.split('$$$$')[1];
    this.isEditMode = true;
  }
  info(element) {
  }
}