import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Actor} from '../../shared/models/actor.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import {ManagmentService} from '../managment.service';


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
  studentForm: NgForm;

  actorData:Actor;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  constructor(  private _manageService: ManagmentService) {
    this.actorData={} as Actor;
  }

  ngOnInit(): void {
    this.getAllActors();
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllActors(){
    this._manageService.getList().subscribe((response: any) => {
      console.log(response);
      const data = this.dataSource.data;
      for (const val of response) {
        data.push(val);
      }
      this.dataSource.data = data;
      console.log("linea 58");
      console.log(this.dataSource.data);
    });

 //   this._manageService.getList().subscribe((response:any) => {
  //     this.data=response;
  //     this.dataSource.data = this.data;
  //    console.log(this.data)
  //      }, (error) => {
  //        console.error(error, 'Ha ocurrido un error.');
  //      }
  //  )
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }

  onSubmit() {

  }

  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  editEntity(element) {
    this.actorData = _.cloneDeep(element);
    this.isEditMode = true;
  }


  deleteItem(id) {
    this._manageService.deleteItem(id).subscribe((response: any) => {
      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: Actor) => {
        return o.id !== id ? o : false;
      })

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()
    });
  }

}
