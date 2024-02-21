import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFaceSmile, faPeopleArrows, faStar } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Errors } from 'src/app/model/auth-model';
import { CustomerOrder, LocalChef } from 'src/app/model/localchef';
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
  customerOrder: CustomerOrder;
  supplier: LocalChef;

  faStar = faStar;
  faPeopleArrows = faPeopleArrows;
  faFaceSmile = faFaceSmile;

  ngOnInit(): void {
    this.loadStripe$.subscribe((s) => {
      console.log('Loaded stripe: ' + s);
    });
    var intentId = this.activatedRoute.snapshot.queryParamMap.get('intent');
    if ( !this.utils.isEmpty(intentId)){
        let observable = this.orderService.retrieveSinglePaymentIntent(intentId);
        observable.pipe(takeUntil(this.destroy$)).subscribe({
          next: (e) => {
            this.paymentIntent = e;
            if ( this.utils.isValid(e)){
              this.retrieveOrder(this.paymentIntent.orderReference);
            }
            console.log('Payment Intent '+ JSON.stringify(e))
          },
          error: (err) => {
            console.error('Error occurred when retrieving payment intent.'+ JSON.stringify(err))
            this.errors = err;
            this.errorMessage = err.error.detail;
            this.toastService.info(this.errorMessage);
          },
        });
    }else{
      console.error('Payment Intent cannot be null')
    }
  }

  retrieveOrder(orderReference: string) {
    let observable = this.orderService.retrieveOrder(orderReference);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => {
        this.customerOrder = e;
        console.log('Customer order '+ JSON.stringify(e));
        if ( this.utils.isValid(e)){
          this.retrieveSupplier(this.customerOrder.supplier._id);
        }
      },
      error: (err) => {
        console.error('Error occurred when retrieving customer order.'+ JSON.stringify(err))
        this.errors = err;
        this.errorMessage = err.error.detail;
        this.toastService.info(this.errorMessage);
      },
    });
  }

  retrieveSupplier(_id: string) {
   let observable = this.supplierService.retrieveSupplier(_id);
   observable.pipe(takeUntil(this.destroy$)).subscribe({
    next: (e) => {
      this.supplier = e;
      console.log('Supplier '+ JSON.stringify(e));
    },
    error: (err) => {
      console.error('Error occurred when retrieving supplier.'+ JSON.stringify(err))
      this.errors = err;
      this.errorMessage = err.error.detail;
      this.toastService.info(this.errorMessage);
    },
  });
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
