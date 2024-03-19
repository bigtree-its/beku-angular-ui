import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faBatteryEmpty, faClose, faFaceSmile, faPeopleArrows, faStar } from '@fortawesome/free-solid-svg-icons';
import { Order, OrderItem } from 'src/app/model/products/all';
import { OrderService } from 'src/app/services/products/order.service';
import { SupplierService } from 'src/app/services/products/supplier.service';
import { Utils } from 'src/app/services/utils';


@Component({
  selector: 'app-basket',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  faArrowLeft = faArrowLeft;
  faBatteryEmpty = faBatteryEmpty;
  faStar = faStar;
  faPeopleArrows = faPeopleArrows;
  faFaceSmile = faFaceSmile;
  faClose = faClose;
  

  cartTotal: number = 0;
  order: Order;
  price: number = 0.00;
  panels = ['Your Order', 'Second', 'Third'];

  showPaymentSummary: boolean = false;

  constructor(
    private _location: Location,
    private orderService: OrderService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.orderService.getData();
    this.orderService.orderSubject$.subscribe({
      next: (value) => {
        this.order = value;
        this.extractData();
      },
      error: (err) => console.error('OrderSubject emitted an error: ' + err),
      complete: () =>
        console.log('OrderSubject emitted the complete notification'),
    });

  }

  removeItem(_t12: OrderItem) {
    this.orderService.removeItem(_t12);
  }

  extractData() {
    if (Utils.isValid(this.order) && this.order.status === "Completed") {
      return;
    }
    if (!Utils.isValid(this.order)) {
      this.cartTotal = 0;
    }
  }

  clickShowPaymentSummary(){
    this.showPaymentSummary = true;
  }
  hidePaymentSummary(){
    this.showPaymentSummary = false;
  }

  goback() {
    this._location.back();
  }

}

