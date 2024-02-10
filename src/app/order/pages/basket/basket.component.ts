import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';
import { CustomerOrder, FoodOrder, LocalChef } from 'src/app/model/localchef';
import { ChefService } from 'src/app/services/chef.service';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { Utils } from 'src/app/services/utils';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  faArrowLeft = faArrowLeft;
  faBatteryEmpty = faBatteryEmpty;

  cartTotal: number = 0;
  order: CustomerOrder;
  chef: LocalChef;
  price: number = 0.00;
  panels = ['Your Order', 'Second', 'Third'];

  constructor(private contextService: ContextService,
    private utils: Utils,
    private _location: Location,
    private orderService: FoodOrderService,
    private chefService: ChefService,
    private router: Router){
  }

  ngOnInit(): void{

    this.orderService.getData();
    this.orderService.orderSubject$.subscribe({
      next: (value) => {
        var customerOrder: CustomerOrder = value;
        this.extractData(customerOrder);
      },
      error: (err) => console.error('OrderSubject emitted an error: ' + err),
      complete: () =>
        console.log('OrderSubject emitted the complete notification'),
    });

    
    this.chef = this.chefService.getData();
  }
  extractData(theOrder: CustomerOrder) {
    if ( this.utils.isValid(theOrder) && theOrder.status === "Completed"){
      return;
    }
    this.order = theOrder;
    if (theOrder !== null && theOrder !== undefined){
      console.log('The order: '+ JSON.stringify(theOrder))
      this.cartTotal = theOrder.subTotal;
      if ( theOrder.items === null || theOrder.items === undefined || theOrder.items.length === 0){
        if ( this.chef !== null && this.chef !== undefined){
          this.router.navigate([ 'cooks', this.chef._id]).then();
        }
      }
    }else{
      this.order = this.getOrder();
      this.cartTotal = this.order.subTotal;
    }
  }

  getAddress(): string {
    var address: string = ""
    if ( this.chef !== null && this.chef !== undefined){
      return this.utils.getChefAddress(this.chef);
    }
    return address;
  }


  getOrder(): CustomerOrder{
    var orderJson = localStorage.getItem('order');
    var order: CustomerOrder = null;
    if ( orderJson !== null && orderJson !== undefined){
      order = JSON.parse(orderJson);
    }
    return order;
  }

  goback(){
    this._location.back();
  }

  getChef(): LocalChef{
    var chefJson = localStorage.getItem('chef');
    var chef: LocalChef = null;
    if ( chefJson !== null && chefJson !== undefined){
      chef = JSON.parse(chefJson);
    }
    return chef;
  }
}

