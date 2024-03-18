import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faBatteryEmpty, faFaceSmile, faPeopleArrows, faStar } from '@fortawesome/free-solid-svg-icons';
import { FoodOrder, LocalChef } from 'src/app/model/localchef';
import { Order, OrderItem } from 'src/app/model/products/all';
import { ChefService } from 'src/app/services/chef.service';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { OrderService } from 'src/app/services/products/order.service';
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

  cartTotal: number = 0;
  order: Order;
  price: number = 0.00;
  panels = ['Your Order', 'Second', 'Third'];

  constructor(private utils: Utils,
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
    if (this.utils.isValid(this.order) && this.order.status === "Completed") {
      return;
    }
    if (!this.utils.isValid(this.order)) {
      this.cartTotal = 0;
    }
  }

  goback() {
    this._location.back();
  }

}

