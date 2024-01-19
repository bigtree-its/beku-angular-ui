import { Component } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { CustomerOrder } from 'src/app/model/localchef';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/auth-model';

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
  user: User;

  constructor(
    private orderService: FoodOrderService,
    private accountService: AccountService,
    private ctxSvc: ContextService,
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

    this.accountService.getData();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        console.log('User subscribed '+ JSON.stringify(value))
        var user: User = value;
        this.extractUser(user);
      },
      error: (err) => console.error('OrderSubject emitted an error: ' + err),
      complete: () =>
        console.log('OrderSubject emitted the complete notification'),
    });

    const serviceLocation = this.ctxSvc.serviceLocationSubject.asObservable();
    serviceLocation.subscribe((a) => {
      this.serviceLocation = a;
    });
  }

  extractUser(user: User) {
    this.user = user;
  }

  private extractData(customerOrder: CustomerOrder) {
    if (customerOrder !== null && customerOrder !== undefined) {
      this.cartTotal = customerOrder.subTotal;
      this.itemsCount = customerOrder.items.length;
    } else {
      this.cartTotal = 0;
      this.itemsCount = 0;
    }
  }

  onClickBasket() {
    this.router.navigate(['basket']).then();
  }

  logout(){
    this.accountService.logout();
  }
}
