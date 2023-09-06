import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Location } from '../model/location';
import { ChefSearchQuery } from '../model/ChefSearchQuery';
import { Calendar, Food, LocalChef } from '../model/localchef';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  
  ipAddress: string | undefined;
  configUrl = 'assets/static/location.json';
  private URL = "http://localhost:8083";
  private BASEPATH = "/ads/v1";
  private URI = "/localchefs";
  private CALENDARS_URI: string ="/calendars";

  constructor(private http:HttpClient) { }

  getAllLocalChefs(query: ChefSearchQuery): Observable<LocalChef[]> {
    console.log('Getting LocalChefs for : ' + JSON.stringify(query));
    var url = this.URL + this.BASEPATH + this.URI;
    var params = new HttpParams();
    if (query.cuisines !== undefined && query.cuisines !== null) {
      params = params.set('cuisines', query.cuisines);
    }
    if (query.slots !== undefined && query.slots !== null) {
      params = params.set('slots', query.slots);
    }
    if (query.delivery !== undefined && query.delivery !== null) {
      params = params.set('delivery', "");
    }
    if (query.serviceAreas !== undefined && query.serviceAreas !== null) {
      params = params.set('serviceAreas', query.serviceAreas);
    }
    if (query.status !== undefined && query.status !== null) {
      params = params.set('status', query.status);
    }
    if (query.email !== undefined && query.email !== null) {
      params = params.set('email', query.email);
    }
    if (query.noMinimumOrder !== undefined && query.noMinimumOrder !== null) {
      params = params.set('noMinimumOrder', "");
    }
    console.log('Get LocalChefs for : ' + params)
    return this.http.get<LocalChef[]>(url, { params });
  }

  getChef(id: string): Observable<LocalChef> {
    var url = this.URL + this.BASEPATH + this.URI+ "/" + id;
    return this.http.get<LocalChef>(url);
  }

  getAllFoods(chefId: string): Observable<Food[]> {

    var url = this.URL + this.BASEPATH + "/foods";
    var params = new HttpParams();
    if (chefId !== undefined && chefId !== null) {
      params = params.set('chef', chefId);
    }
    console.log('Fetching foods for : ' + params)
    return this.http.get<Food[]>(url, { params });
  }

  getCalendars(chefId: string, thisWeek: boolean, thisMonth: boolean): Observable<Calendar[]> {

    var url = this.URL + this.BASEPATH + this.CALENDARS_URI;
    var params = new HttpParams();
    if (chefId !== undefined && chefId !== null) {
      params = params.set('chef', chefId);
    }
    if (thisWeek !== undefined && thisWeek) {
      params = params.set('thisweek', 'true');
    }
    if (thisMonth !== undefined && thisMonth) {
      params = params.set('thisMonth', 'true');
    }

    console.log('Fetching calendars for : ' + params)
    return this.http.get<Calendar[]>(url, { params });
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
      return this.ipAddress;
    });
  }

  getStaticIP(){
    return "123.235.324.1";
  }

  getLocations() {
    return this.http.get<Location[]>(this.configUrl);
  }
}
