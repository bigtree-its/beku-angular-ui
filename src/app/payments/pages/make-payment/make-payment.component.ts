import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faFaceSmile,
  faMinus,
  faPeopleArrows,
  faPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Errors } from 'src/app/model/auth-model';
import { FoodOrder, LocalChef } from 'src/app/model/localchef';
import { PaymentIntentResponse } from 'src/app/model/order';
import { ChefService } from 'src/app/services/chef.service';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { StripeService } from 'src/app/services/stripe.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
})
export class MakePaymentComponent implements OnInit, OnDestroy {
  // Dependencies
  stripeService = inject(StripeService);
  activatedRoute = inject(ActivatedRoute);
  utils = inject(Utils);
  orderService = inject(FoodOrderService);
  supplierService = inject(ChefService);
  toastService = inject(ToastService);

  public loadStripe$: Observable<any> = this.stripeService.LoadStripe();

  @ViewChild('stripeContent', { read: ElementRef })
  public stripeContent: ElementRef<any>;
  @ViewChild('cardInfo', { read: ElementRef }) public cardInfo: ElementRef<any>;
  @ViewChild('#payment-element', { read: ElementRef })
  public paymentOptions: ElementRef<any>;
  @ViewChild('cardErrors', { read: ElementRef })
  public cardErrors: ElementRef<any>;
  @ViewChild('payment-message', { read: ElementRef })
  public paymentMessage: ElementRef<any>;

  chef: LocalChef;
  destroy$ = new Subject<void>();
  stripeElements: any;
  cardElement: any;
  paymentIntent: PaymentIntentResponse;
  errors: Errors = { errors: {} };
  errorMessage: any;
  foodOrder: FoodOrder;
  supplier: LocalChef;

  faStar = faStar;
  faPeopleArrows = faPeopleArrows;
  faFaceSmile = faFaceSmile;
  faPlus = faPlus;
  faMinus = faMinus;

  openSupplier: boolean = true;
  showSupplier: boolean = false;

  openOrder: boolean = true;
  showOrder: boolean = false;

  openItems: boolean = true;
  showItems: boolean = false;
  error = false;

  ngOnInit(): void {
    this.error = false;
    this.loadStripe$.subscribe((s) => {
      console.log('Loaded stripe: ' + s);
    });
    var intentId = this.activatedRoute.snapshot.queryParamMap.get('intent');
    if (!Utils.isEmpty(intentId)) {
      let observable = this.orderService.retrieveSinglePaymentIntent(intentId);
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: (e) => {
          this.paymentIntent = e;
          console.log('Payment Intent ' + JSON.stringify(e));
          if (Utils.isValid(e)) {
            if (this.paymentIntent.status === 'succeeded') {
              this.error = true;
              this.errorMessage = 'This order has already been paid';
              this.toastService.warning('This order has already been paid');
            }
            this.retrieveOrder(this.paymentIntent.orderReference);
          } else {
            this.error = true;
            this.errorMessage =
              'There is some issue retrieving this order. Please contact customer support';
            this.toastService.warning(
              'There is some issue retrieving this order. Please contact customer support'
            );
          }
        },
        error: (err) => {
          this.error = true;
          console.error(
            'Error occurred when retrieving payment intent.' +
            JSON.stringify(err)
          );
          this.errors = err;
          if (Utils.isJsonString(err)) {
            this.errorMessage = err.error.detail;
            this.toastService.info(this.errorMessage);
          } else {
            this.errorMessage =
              'There is some issue retrieving this order. Please contact customer support';
          }
        },
      });
    } else {
      console.error('Payment Intent cannot be null');
      this.error = true;
    }
  }

  retrieveOrder(orderReference: string) {
    let observable = this.orderService.retrieveSingleOrder(orderReference, null);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => {
        if (Utils.isValid(e)) {
          this.foodOrder = e[0];
          console.log('Customer order ' + JSON.stringify(e));
          this.retrieveSupplier(this.foodOrder.supplier._id);
        }

      },
      error: (err) => {
        console.error(
          'Error occurred when retrieving customer order.' + JSON.stringify(err)
        );
        this.errors = err;
        this.error = true;
        this.errorMessage = 'Error occurred when retrieving customer order';
        this.toastService.warning(
          'Error occurred when retrieving customer order.'
        );
        if (Utils.isJsonString(err)) {
          this.errorMessage = err.error.detail;
          this.error = true;
        }
      },
    });
  }

  retrieveSupplier(_id: string) {
    let observable = this.supplierService.retrieveSupplier(_id);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => {
        this.supplier = e;
        console.log('Supplier ' + JSON.stringify(e));
      },
      error: (err) => {
        console.error(
          'Error occurred when retrieving supplier.' + JSON.stringify(err)
        );
        this.errors = err;
        this.error = true;
        this.errorMessage = err.error.detail;
        this.toastService.info(this.errorMessage);
      },
    });
  }

  openCloseSupplier() {
    this.openSupplier = !this.openSupplier; //not equal to condition
    this.showSupplier = !this.showSupplier;
    this.openOrder = false; //not equal to condition
    this.showOrder = false;
    this.openItems = false; //not equal to condition
    this.showItems = false;
  }
  openCloseOrder() {
    this.openOrder = !this.openOrder; //not equal to condition
    this.showOrder = !this.showOrder;
    this.openSupplier = false; //not equal to condition
    this.showSupplier = false;
    this.openItems = false; //not equal to condition
    this.showItems = false;
  }
  openCloseItems() {
    this.openItems = !this.openItems; //not equal to condition
    this.showItems = !this.showItems;
    this.openSupplier = false; //not equal to condition
    this.showSupplier = false;
    this.openOrder = false; //not equal to condition
    this.showOrder = false;
  }

  ngOnDestroy() {
    if (this.cardElement) {
      this.cardElement.removeEventListener('change', (result: any) => {
        this.cardErrors = result.error && result.error.message;
        this.cardElement.destroy();
      });
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
