import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ServiceLocator } from '../service.locator';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/products/all';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http=inject(HttpClient);
  serviceLocator=inject(ServiceLocator);

  constructor() { }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.serviceLocator.productsUrl+"/"+ id);
  }
}
