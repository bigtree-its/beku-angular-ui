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
    if ( this.order === null || this.order === undefined){
      this.order = this.getOrder();
    }
    this.orderSubject = new BehaviorSubject<CustomerOrder>(this.order);
    this.chefSubject = new BehaviorSubject<LocalChef>(this.chef);
    this.serviceLocationSubject = new BehaviorSubject<ServiceLocation>(this.serviceLocation);
  }

  getOrder(): CustomerOrder{
    var orderJson = sessionStorage.getItem('order');
    var order: CustomerOrder = null;
    if ( orderJson !== null && orderJson !== undefined){
      order = JSON.parse(orderJson);
    }
    return order;
  }

  publishServiceLocation(serviceLocation: ServiceLocation) {
    this.serviceLocation = serviceLocation;
    sessionStorage.setItem("serviceLocation", JSON.stringify(serviceLocation));
    this.serviceLocationSubject.next({ ...serviceLocation });
  }

  public selectChef(theChef: LocalChef) {
    this.chef = theChef;
    sessionStorage.setItem("chef", JSON.stringify(theChef));
    this.chefSubject.next({ ...theChef });
  }

  public retrieveChef(): LocalChef{
    var json = sessionStorage.getItem("chef");
    if (! this.utils.isEmpty(json)){
      return JSON.parse(json);
    }
    return null;
  }

  public publishOrder(theOrder: CustomerOrder) {
    this.order = theOrder;
    this.orderSubject.next({ ...theOrder });
    sessionStorage.setItem("order", JSON.stringify(theOrder));
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

  updateItem(item: FoodOrderItem) {
    for (var i = 0; i < this.order.items.length; i++) {
      var fi = this.order.items[i];
      if (fi._tempId === item._tempId) {
        this.order.items.splice(i, 1);
        this.order.items.push(item);
        this.calculateTotal();
        break;
      }
    }
  }

  removeItem(item: FoodOrderItem) {
    for (var i = 0; i < this.order.items.length; i++) {
      var fi = this.order.items[i];
      if (fi._tempId === item._tempId) {
        this.order.items.splice(i, 1);
        this.calculateTotal();
        break;
      }
    }
  }

  public calculateTotal() {
    console.log('Calculating food order total');
    let subTotal: number = 0;
    let totalToPay: number = 0;
    if (this.order.items !== null && this.order.items !== undefined && this.order.items.length > 0) {
      this.order.items.forEach((item) => {
        subTotal = subTotal + item.subTotal;
      });
    }
    this.order.subTotal = subTotal;
    if (this.order.serviceMode === 'DELIVERY'){
      this.order.deliveryFee = 0.50;
    }
    totalToPay = this.order.subTotal + this.order.deliveryFee + this.order.packingFee + this.order.serviceFee;
    this.order.total = totalToPay;
    this.order.total = +(+this.order.total).toFixed(2);
    this.publishOrder(this.order);
  }

  getChef() {
    this.chefSubject.asObservable();
  }
}
