import { Component } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderservice } from 'src/app/services/food-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLocation } from 'src/app/model/ServiceLocation';

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

	constructor(private contextService: ContextService,
    private router: Router) {}

  ngOnInit(): void{
    this.contextService.orderSubject.subscribe(foodOrder => {
      if (foodOrder !== null && foodOrder !== undefined){
        this.cartTotal = foodOrder.subTotal;
        this.itemsCount = foodOrder.items.length;
      }
    });
    this.contextService.serviceLocationSubject.subscribe(serviceLocation => {
      var sl: ServiceLocation;
      if (serviceLocation !== null && serviceLocation !== undefined){
        sl = serviceLocation;
      }else{
        var sl = this.contextService.getServiceLocation();
      }
      this.serviceLocation = sl;
      this.displayableServiceLocation = this.serviceLocation.name+", "+ this.serviceLocation.city;
    });
  }

  onClickBasket(){
    this.router.navigate([ 'basket']).then();
  }
}
