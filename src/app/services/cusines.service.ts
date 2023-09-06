import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisine, LocalChef } from '../model/localchef';

@Injectable({
  providedIn: 'root',
})
export class CuisinesService {

  private HOST = "http://localhost:8083";
  private URI = "/ads/v1/cuisines";

  constructor(private http:HttpClient) {}

  getCuisines(): Observable<Cuisine[]> {
    var url = this.HOST + this.URI ;
    return this.http.get<Cuisine[]>(url);
  }

}