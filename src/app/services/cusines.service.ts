import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisine } from '../model/localchef';
import { ServiceLocator } from './service.locator';

@Injectable({
  providedIn: 'root',
})
export class CuisinesService {

  constructor(private http:HttpClient,
    private serviceLocator: ServiceLocator) {}

  getCuisines(): Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(this.serviceLocator.cuisinesUrl);
  }

}