import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  faArrowLeft,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { User } from 'src/app/model/auth-model';
import {
  CustomerOrder,
  CustomerOrderList,
  OrderSearchQuery,
} from 'src/app/model/localchef';
import { AccountService } from 'src/app/services/account.service';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  accountService = inject(AccountService);
  orderService = inject(FoodOrderService);
  toastService = inject(ToastService);
  utils = inject(Utils);
  user: User;
  destroy$ = new Subject<void>();
  orders: CustomerOrder[] = [];
  viewOrder: CustomerOrder;
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faMinus = faMinus;

  openItems: boolean = true;
  showItems: boolean = false;

  ngOnInit() {
    console.log('Init. Customer orders');
    this.accountService.getData();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        this.user = value;
        console.log('CustomerObject. emitted ' + JSON.stringify(value));
        this.fetchCustomerOrders();
      },
      error: (err) => console.error('CustomerObject emitted an error: ' + err),
      complete: () =>
        console.log('CustomerObject emitted the complete notification'),
    });
  }

  fetchCustomerOrders() {
    if (this.utils.isValid(this.user)) {
      let orderSearchQuery: OrderSearchQuery = {
        customerEmail: this.user.email,
      };
      let observable = this.orderService.getCustomerOrders(orderSearchQuery);
      observable.subscribe((e) => {
        if (this.utils.isValid(e)) {
          this.orders = e;
          console.log('Orders ' + this.orders.length);
        }
      });
    }
  }

  openCloseItems() {
    this.openItems = !this.openItems; //not equal to condition
    this.showItems = !this.showItems;
  }

  open(order: CustomerOrder) {
    this.viewOrder = order;
  }

  goBack() {
    this.viewOrder = null;
  }

  submit() {
    this.performAction("Submit");
  }

  private performAction(action: string) {
    let observable = this.orderService.action(this.viewOrder.reference, action);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => {
        if ( action === 'Delete'){
          this.viewOrder = null;
        }else{
          this.viewOrder = e;
        }
        this.toastService.success('Order has been '+action);
      },
      error: (err) => {
        console.error('Errors from reset submit.' + JSON.stringify(err));
        if (this.utils.isJsonString(err)) {
          this.toastService.error(err.error.detail);
        }
      },
    });
  }

  cancel() {
    this.performAction("Cancel");
  }

  delete() {
    this.performAction("Delete");
  }

  update() {}

  pay() {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
