import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {OfferCinemaService} from './offer-cinema.service';
import {Offer} from '../../shared/models/offer.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './offer-cinema.component.html',
  styleUrls: ['./offer-cinema.component.css']
})
export class OfferCinemaComponent implements OnInit,AfterViewInit {

  data: Offer[];
  displayedColumns = ['description','addPoints','subPoints','date','estado','edit','information','delete'];


  dataSource = new MatTableDataSource<Offer>();
  isEditMode = false;

  @ViewChild('entityForm', {static: false})
  entityForm: NgForm;
  entityData: Offer;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _offerCinemaService: OfferCinemaService, private _authService:AuthService) {
    this.entityData = {} as Offer;
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
    const typeUser=this._authService.checkAuthType();
    console.log(typeUser);
    this._offerCinemaService.getList(this._authService.checkIdTable()).subscribe((response: any) => {
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
    this.entityData.idCinema=this._authService.checkIdTable();
    this.entityData.totalOffers=0;
    this._offerCinemaService.createItem(this.entityData).subscribe((response: any) => {
      this.getAllEntity();
      this.entityData.deadlineOffer = new Date();
      this.entityData.addPoints = 0;
      this.entityData.descriptionOffer = '';
      this.entityData.subPoints = 0;
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
    const entityUpdate = new Offer();
    entityUpdate.id=this.entityData.id;
    entityUpdate.idCinema=this._authService.checkIdTable();
    entityUpdate.descriptionOffer=this.entityData.descriptionOffer;
    entityUpdate.deadlineOffer=this.entityData.deadlineOffer;
    entityUpdate.subPoints=this.entityData.subPoints;
    entityUpdate.addPoints=this.entityData.addPoints;
    entityUpdate.totalOffers=this.entityData.totalOffers;
    this._offerCinemaService.updateItem(entityUpdate).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: Offer) => {
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
    this._offerCinemaService.deleteItem(id).subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = this.dataSource.data.filter((o: Offer) => {
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
    console.log(element)
    this.entityData
    this.entityData.addPoints=element.addPoints;
    this.entityData = _.cloneDeep(element);
    console.log(this.entityData);
    this.isEditMode = true;
  }

  info(element) {
  }
}