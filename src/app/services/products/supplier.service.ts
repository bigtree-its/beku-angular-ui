import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, Product, Supplier } from 'src/app/model/products/all';
import { ServiceLocator } from '../service.locator';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  

  http=inject(HttpClient);
  serviceLocator=inject(ServiceLocator);

  constructor() { }

  getSupplier(_id: String): Observable<Supplier> {
    console.log('Fetching supplier '+ _id)
    return this.http.get<Supplier>(this.serviceLocator.SupplierUrl+"/"+ _id);
  }

}
