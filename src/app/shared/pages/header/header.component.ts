import { Component } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { Utils } from 'src/app/services/utils';
import { FoodOrderService } from 'src/app/services/food-order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartTotal: number = 0;
  serviceLocation: ServiceLocation;
  displayableServiceLocation: string = "";
  itemsCount: number =0;

 
	constructor(
    private orderService: FoodOrderService,
    private ctxSvc: ContextService,
    private router: Router) {
    }

  ngOnInit(): void{
    const foodOrder = this.orderService.orderSubject$.asObservable();
    foodOrder.subscribe(e=>{
      if (e !== null && e !== undefined){
        this.cartTotal = e.subTotal;
        this.itemsCount = e.items.length;
      }else{
        this.cartTotal = 0;
        this.itemsCount = 0;
      }
    });
    
    const serviceLocation = this.ctxSvc.serviceLocationSubject.asObservable();
    serviceLocation.subscribe(a=>{
      this.serviceLocation = a;
    })
  }

  onClickBasket(){
    this.router.navigate([ 'basket']).then();
  }
}
