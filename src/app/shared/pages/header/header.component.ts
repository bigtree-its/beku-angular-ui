import { Component, inject } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { CustomerOrder } from 'src/app/model/localchef';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/auth-model';
import { NavigationService } from 'src/app/services/navigation.service';
import { faBars, faKitchenSet, faBagShopping, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/services/local.service';
import { Constants } from 'src/app/services/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartTotal: number = 0;
  serviceLocation: ServiceLocation;
  displayableServiceLocation: string = '';
  itemsCount: number = 0;
  user: User = null;
  faBars = faBars;
  logoIcon = faKitchenSet;
  cartIcon = faBagShopping;

  localService = inject(LocalService);
  constants = inject(Constants);

  constructor(
    private orderService: FoodOrderService,
    private accountService: AccountService,
    private ctxSvc: ContextService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  private extractData(customerOrder: CustomerOrder) {
    if (customerOrder !== null && customerOrder !== undefined) {
      this.cartTotal = customerOrder.subTotal;
      this.itemsCount = customerOrder.items?.length;
    } else {
      this.cartTotal = 0;
      this.itemsCount = 0;
    }
  }

  toggleSideNav() {
    this.navigationService.setShowNav(true);
  }

  onClickBasket() {
    this.router.navigate(['basket']).then();
  }

  logout(){
    this.accountService.logout();
  }
}
