import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Actor} from '../../shared/models/actor.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import {ActorService} from './actor.service';


@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit,AfterViewInit {
  data: Actor[];
   displayedColumns = ['name',  'action'
  ];


  dataSource = new MatTableDataSource<Actor>();
  isEditMode=false;

  @ViewChild('actorForm', { static: false })
  ActorForm: NgForm;

  actorData:Actor;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  constructor(  private _actorService: ActorService) {
    this.actorData={} as Actor;
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
    this._actorService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  addEntity() {
    this._actorService.createItem(this.actorData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
    this.actorData.nameActor='';
    });
  }


  onSubmit() {
    if (this.ActorForm.form.valid) {
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
    this.ActorForm.resetForm();
  }
  editEntity(element) {
    this.actorData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  updateEntity() {
    const actorUpdate = new Actor();
    actorUpdate.id=this.actorData.id;
    actorUpdate.nameActor=this.actorData.nameActor;
    this._actorService.updateItem(actorUpdate).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: Actor) => {
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
    this._actorService.deleteItem(id).subscribe((response: any) => {
      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: Actor) => {
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
