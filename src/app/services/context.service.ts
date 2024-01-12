import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cuisine, CustomerOrder, FoodOrderItem, LocalChef } from '../model/localchef';
import { ServiceLocation } from '../model/ServiceLocation';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  
  chefSubject: BehaviorSubject<LocalChef>;
  orderSubject: BehaviorSubject<CustomerOrder>;
  serviceLocationSubject: BehaviorSubject<ServiceLocation>;
  private order: CustomerOrder;
  private chef: LocalChef;
  serviceLocation: ServiceLocation;
  cuisine: Cuisine;

  constructor(
    private utils: Utils
  ) {
    this.serviceLocationSubject = new BehaviorSubject<ServiceLocation>(this.serviceLocation);
  }

  publishServiceLocation(serviceLocation: ServiceLocation) {
    this.serviceLocation = serviceLocation;
    sessionStorage.setItem("serviceLocation", JSON.stringify(serviceLocation));
    this.serviceLocationSubject.next({ ...serviceLocation });
  }


  public destroyOrder(){
    console.log('Destroying order')
    this.order = undefined;
    this.orderSubject.next(null);
    sessionStorage.removeItem('order');
  }

  selectCuisine(cuisine: Cuisine) {
    this.cuisine = cuisine;
  }

  selectLocation(sl: ServiceLocation) {
    this.serviceLocation = sl;
    this.serviceLocationSubject.next({ ...this.serviceLocation });
    sessionStorage.setItem("servicelocation", JSON.stringify(sl));
  }

  getServiceLocation(): ServiceLocation{
    if ( this.serviceLocation === null || this.serviceLocation === undefined){
      var serviceLocationJson = sessionStorage.getItem('servicelocation');
      if ( serviceLocationJson !== null && serviceLocationJson !== undefined){
        this.serviceLocation = JSON.parse(serviceLocationJson);
      }
    }
    return this.serviceLocation;
  }

  getChef() {
    this.chefSubject.asObservable();
  }
}
