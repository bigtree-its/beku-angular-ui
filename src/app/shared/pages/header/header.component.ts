import { Component } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { Utils } from 'src/app/services/utils';

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
    private router: Router) {
    }

  ngOnInit(): void{
    this.contextService.orderSubject.subscribe(foodOrder => {
      if (foodOrder !== null && foodOrder !== undefined){
        this.cartTotal = foodOrder.subTotal;
        this.itemsCount = foodOrder.items.length;
      }else{
        this.cartTotal = 0;
        this.itemsCount = 0;
      }
    });
    const serviceLocation = this.contextService.serviceLocationSubject.asObservable();
    serviceLocation.subscribe(a=>{
      this.serviceLocation = a;
    })
  }

  onClickBasket(){
    this.router.navigate([ 'basket']).then();
  }
}
