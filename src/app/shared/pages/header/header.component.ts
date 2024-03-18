import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { FoodOrder } from 'src/app/model/localchef';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/auth-model';
import { NavigationService } from 'src/app/services/navigation.service';
import { faBars, faKitchenSet, faBagShopping, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/services/local.service';
import { Constants } from 'src/app/services/constants';
import { OrderService } from 'src/app/services/products/order.service';
import { Order } from 'src/app/model/products/all';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  
  serviceLocation: ServiceLocation;
  displayableServiceLocation: string = '';

  productsTotal: number = 0;
  foodTotal: number = 0;
  productItems: number = 0;
  foodItems: number = 0;

  user: User = null;
  faBars = faBars;
  logoIcon = faKitchenSet;
  cartIcon = faBagShopping;
  pOrder: Order = null;
  fOrder: FoodOrder = null;

  pOrderSvc = inject(OrderService);
  localService = inject(LocalService);
  constants = inject(Constants);

  constructor(
    private fOrderSvc: FoodOrderService,
    private accountService: AccountService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fOrderSvc.getData();
    this.fOrderSvc.orderSubject$.subscribe({
      next: (value) => {
        this.fOrder = value;
        console.log('FoodOrder rx emitted a notification. '+ JSON.stringify(this.fOrder))
        this.extractFoodOrder();
      },
      error: (err) => console.error('OrderSubject emitted an error: ' + err),
      complete: () =>
        console.log('OrderSubject emitted the complete notification'),
    });

    this.pOrderSvc.getData();
    this.pOrderSvc.orderSubject$.subscribe({
      next: (value) => {
        this.pOrder = value;
        console.log('ProductOrder rx emitted a notification. '+ JSON.stringify(this.pOrder))
        this.extractProductOrder();
      },
      error: (err) => console.error('Product order emitted an error: ' + err),
      complete: () =>
        console.log('Product order emitted the complete notification'),
    });

    var json = this.localService.getData(Constants.StorageItem_Location);
    if ( json !== null && json !== '' && json !== undefined){
      this.serviceLocation = JSON.parse(json);
    }

    this.accountService.getData();
    this.accountService.getCustomerPreferences();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        this.user = value;
      },
      error: (err) => console.error('CustomerObject emitted an error: ' + err),
      complete: () =>
        console.log('CustomerObject emitted the complete notification'),
    });
  }

  extractProductOrder() {
    if (this.pOrder !== null && this.pOrder !== undefined) {
      this.productsTotal = this.pOrder.subTotal;
      this.productItems = this.pOrder.items?.length;
    } else {
      this.productsTotal = 0;
      this.productItems = 0;
    }
  }

  private extractFoodOrder() {
    if (Utils.isValid(this.fOrder)) {
      this.foodTotal = this.fOrder.subTotal;
      this.foodItems = this.fOrder.items?.length;
      console.log('Food total '+ this.foodTotal)
      console.log('Food Items '+ this.foodItems)
    } else {
      this.foodTotal = 0;
      this.foodItems = 0;
    }
  }

  toggleSideNav() {
    this.navigationService.setShowNav(true);
  }

  gotoBasket() {
    this.router.navigate(['basket']).then();
  }

  logout(){
    this.accountService.logout();
  }
}
