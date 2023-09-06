import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerOrder, FoodOrder, LocalChef } from 'src/app/model/localchef';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderservice } from 'src/app/services/food-order.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  cartTotal: number = 0;
  order: CustomerOrder;
  chef: LocalChef;
  price: number = 0.00;
  panels = ['Your Order', 'Second', 'Third'];

  constructor(private contextService: ContextService,
    private utils: Utils,
    private _lcoation: Location,
    private router: Router){
  }

  ngOnInit(): void{
    this.contextService.orderSubject.subscribe(theOrder =>{
      console.log('Subescribed order: '+ JSON.stringify(theOrder))
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
    });
    this.contextService.chefSubject.subscribe(theChef =>{
      this.chef = theChef;
      if (theChef !== null && theChef !== undefined){
        console.log('The chef: '+ JSON.stringify(theChef))
      }else{
        this.chef = this.getChef();
      }
    });
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
    this._lcoation.back();
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

