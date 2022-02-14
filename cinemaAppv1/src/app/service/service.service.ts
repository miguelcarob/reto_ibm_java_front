import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { categoria } from '../modelo/categoria';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8080:reto_ibm_java_front-main/categoria';

  // getCategoria (){
  //   return this.http.get<categoria[]>(this.Url)>
  // }
}
