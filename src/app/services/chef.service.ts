import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Location } from '../model/location';
import { ChefSearchQuery } from '../model/ChefSearchQuery';
import { Calendar, Collection, Food, LocalChef, Menu } from '../model/localchef';
import { ServiceLocator } from './service.locator';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  
  ipAddress: string | undefined;
  configUrl = 'assets/static/location.json';

  constructor(private http:HttpClient,
    private serviceLocator: ServiceLocator) { 
  }

  getAllLocalChefs(query: ChefSearchQuery): Observable<LocalChef[]> {
    console.log('Getting LocalChefs for : ' + JSON.stringify(query));
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
    return this.http.get<LocalChef[]>(this.serviceLocator.chefsUrl, { params });
  }

  getChef(id: string): Observable<LocalChef> {
    console.log('Retrieving Supplier '+ id)
    var url = this.serviceLocator.chefsUrl+ "/" + id;
    return this.http.get<LocalChef>(url);
  }

  getMenusForChef(chefId: string): Observable<Menu[]> {

    var params = new HttpParams();
    if (chefId !== undefined && chefId !== null) {
      params = params.set('chef', chefId);
    }
    console.log('Fetching menus for : ' + params)
    return this.http.get<Menu[]>(this.serviceLocator.menusUrl, { params });
  }

  getCalendars(chefId: string, thisWeek: boolean, thisMonth: boolean): Observable<Calendar[]> {

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
    return this.http.get<Calendar[]>(this.serviceLocator.calendersUrl, { params });
  }

  getCollections(chefId: string): Observable<Collection[]> {
    var params = new HttpParams();
    if (chefId !== undefined && chefId !== null) {
      params = params.set('chef', chefId);
    }
    return this.http.get<Collection[]>(this.serviceLocator.collectionsUrl, { params });
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
