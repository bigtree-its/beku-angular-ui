import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceLocation } from '../model/ServiceLocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private URL = "http://localhost:8083";
  private BASEPATH = "/ads/v1";
  private LOCALAREA_URI = "/localarea";

  constructor( private http: HttpClient) { }

  fetchLocalAreas(searchText: string): Observable<ServiceLocation[]> {
    var url = this.URL + this.BASEPATH + this.LOCALAREA_URI;
    var params = new HttpParams();
    if (searchText !== undefined && searchText !== null) {
      params = params.set('text', searchText);
    }
    console.log('Lookup ServiceLocations for : ' + params)
    return this.http.get<ServiceLocation[]>(url, { params });
  }

  getLocation(slug: string): Observable<ServiceLocation>{
    var url = this.URL + this.BASEPATH + this.LOCALAREA_URI;
    var params = new HttpParams();
    if (slug !== undefined && slug !== null) {
      params = params.set('slug', slug);
    }
    return this.http.get<ServiceLocation>(url, { params });
  }
}