import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CinemaService} from './cinema.service';
import {Cinema} from '../../shared/models/cinema.model';
import {NewCinema} from '../../shared/models/newCinema.model';

@Component({
    selector: 'app-cinema',
    templateUrl: './cinema.component.html',
    styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit, AfterViewInit {
    data: Cinema[];
    displayedColumns = ['nameCinema','username','emailCinema','webPage', 'Acciones'];


    dataSource = new MatTableDataSource<Cinema>();
    isEditMode = false;

    @ViewChild('entityForm', {static: false})
    entityForm: NgForm;
    entityData: NewCinema;


    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(private _cinemaService: CinemaService) {
        this.entityData = {} as NewCinema;
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
        this._cinemaService.getList().subscribe((response: any) => {
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
        this.entityData.passwordUserCinema='1234';
        this.entityData.cityCinema='Falta Asignar';
        this.entityData.adressCinema='Falta Asignar';
        console.log(this.entityData);
        this._cinemaService.createItem(this.entityData).subscribe((response: any) => {
            this.getAllEntity();
            this.entityData.usernameUserCinema = '';
            this.entityData.surnameUserCinema = '';
            this.entityData.nameUserCinema = '';
            this.entityData.emailUserCinema = '';
            this.entityData.webCinema='';
        });
    }


    onSubmit() {
        if (this.entityForm.form.valid) {
            if (this.isEditMode)
                console.log('editar');
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

    deleteEntity(id) {
        this._cinemaService.deleteItem(id).subscribe((response: any) => {
            // Approach #1 to update datatable data on local itself without fetching new data from server
            this.dataSource.data = this.dataSource.data.filter((o: Cinema) => {
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
