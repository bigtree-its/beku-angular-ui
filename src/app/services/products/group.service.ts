import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/model/products/all';
import { ServiceLocator } from '../service.locator';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  http=inject(HttpClient);
  serviceLocator=inject(ServiceLocator);

  constructor() { }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.serviceLocator.groupsUrl);
  }
}
