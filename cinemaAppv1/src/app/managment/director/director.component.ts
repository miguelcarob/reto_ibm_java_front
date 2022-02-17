import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {Director} from '../../shared/models/director.model';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DirectorService} from './director.service';


@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit,AfterViewInit {

  data: Director[];
  displayedColumns = ['nameEntity','Acciones'];


  dataSource = new MatTableDataSource<Director>();
  isEditMode=false;

  @ViewChild('entityForm', { static: false })
  entityForm: NgForm;

  entityData:Director;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  constructor(  private _categoryService: DirectorService) {
    this.entityData={} as Director;
  }

  ngOnInit(): void {
    this.getAllEntity();
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllEntity(){
    this._categoryService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  addEntity() {
    this._categoryService.createItem(this.entityData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
      this.entityData.nameDirector='';
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
  cancelEdit() {
    this.isEditMode = false;
    this.entityForm.resetForm();
  }
  editEntity(element) {
    this.entityData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  updateEntity() {
    const entityUpdate = new Director();
    entityUpdate.id=this.entityData.id;
    entityUpdate.nameDirector=this.entityData.nameDirector;
    this._categoryService.updateItem(entityUpdate).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: Director) => {
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
  deleteEntity(id) {
    this._categoryService.deleteItem(id).subscribe((response: any) => {
      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: Director) => {
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

}
