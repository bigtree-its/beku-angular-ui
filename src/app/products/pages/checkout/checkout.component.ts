import { Location } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  RapidApiByPostcodeResponse,
  RapidApiByPostcodeResponseSummary,
} from 'src/app/model/address';
import { RapidApiService } from 'src/app/services/rapid-api.service';
import { Utils } from 'src/app/services/utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeService } from 'src/app/services/stripe.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaymentIntentResponse } from 'src/app/model/order';
import { Address } from 'src/app/model/common-models';
import {
  faPersonBiking,
  faBox,
  faArrowLeft,
  faTruckFast,
  faPlus,
  faMinus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/auth-model';
import { ToastService } from 'src/app/services/toast.service';
import { CheckoutItem, Order, OrderItem, Supplier, SupplierBasic } from 'src/app/model/products/all';
import { OrderService } from 'src/app/services/products/order.service';
import { SupplierService } from 'src/app/services/products/supplier.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnDestroy {

  @ViewChild('stripeContent', { read: ElementRef })
  public stripeContent: ElementRef<any>;
  @ViewChild('cardInfo', { read: ElementRef }) public cardInfo: ElementRef<any>;
  @ViewChild('#payment-element', { read: ElementRef })
  public paymentOptions: ElementRef<any>;
  @ViewChild('cardErrors', { read: ElementRef })
  public cardErrors: ElementRef<any>;
  @ViewChild('payment-message', { read: ElementRef })
  public paymentMessage: ElementRef<any>;

  faPersonBiking = faPersonBiking;
  faBox = faBox;
  faArrowLeft = faArrowLeft;
  faTruckFast = faTruckFast;
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;

  enablePayButton: boolean = false;

  customerMobile: string = '';
  customerEmail: string = '';
  customerName: string = '';
  notesToChef: string = '';

  divHeader: string = '';

  showContactDetails: boolean = false;

  nextButtonText: string = 'Next';
  showHomeScreen: boolean = true;
  showCustomerDetailsSection: boolean = false;
  showServiceModeSection: boolean = false;
  showItemsSection: boolean = false;
  showPaymentSection: boolean = false;
  showStripeSection: boolean = false;
  showPlaceOrderButton: boolean = false;

  serviceMode: string = 'COLLECTION';
  customerAddress: Address;
  addressLookupPostcode: string;
  hidePostcodeLookupForm: boolean;
  postcodeAddressList: RapidApiByPostcodeResponseSummary[];
  rapidApiByPostcodeResponseSummary: RapidApiByPostcodeResponseSummary;
  postcode: string;
  addressSelected: boolean;
  lookupAddress: boolean = true;

  cartTotal: number = 0;
  order: Order;
  price: number = 0.0;
  stripeElements: any;
  cardElement: any;
  paymentIntent: PaymentIntentResponse;
  destroy$ = new Subject<void>();
  customerLoggedIn: boolean;
  customer: User;
  orderSubmitted: boolean = false;
  showOrderConfirmation: boolean = false;
  loading: any;
  supplierIds: String[] = [];
  itemsMap: Map<String, OrderItem[]> = new Map<String, OrderItem[]>();
  supplierMap: Map<String, Supplier> = new Map<String, Supplier>();
  checkoutItemsMap: Map<SupplierBasic, CheckoutItem> = new Map<SupplierBasic, CheckoutItem>();

  constructor(
    private rapidApiService: RapidApiService,
    private stripeService: StripeService,
    private _location: Location,
    private modalService: NgbModal,
    private orderService: OrderService,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router,
    private supplierService: SupplierService,
    private titleService: Title
  ) { }

  public loadStripe$: Observable<any> = this.stripeService.LoadStripe();

  ngOnInit(): void {
    this.titleService.setTitle("Checkout")
    this.loadStripe$.subscribe((s) => {
      console.log('Loaded stripe: ' + s);
    });
    this.orderService.getData();
    this.orderService.orderSubject$.subscribe({
      next: (value) => {
        console.log('OrderSubject rx emitted : ' + JSON.stringify(value));
        var order: Order = value;
        this.extractOrder(order);
      },
      error: (err) => console.error('OrderSubject emitted an error: ' + err),
      complete: () =>
        console.log('OrderSubject emitted the complete notification'),
    });

    this.accountService.getData();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        console.log('Customer subject ' + JSON.stringify(value));
        this.customer = value;
        if (this.customer !== null && this.customer !== undefined) {
          this.customerName = this.customer.firstName + this.customer.lastName;
          this.customerEmail = this.customer.email;
          this.customerMobile = this.customer.mobile;
          this.showCustomerDetailsSection = true;
          this.showHomeScreen = false;
          this.showContactDetails = true;
        } else {
          this.showHomeScreen = true;
          this.showContactDetails = false;
          this.showCustomerDetailsSection = false;
        }
      },
      error: (err) => console.error('CustomerSubject emitted an error: ' + err),
      complete: () =>
        console.log('CustomerSubject emitted the complete notification'),
    });
  }

  openCloseContactDetails() {
    this.showContactDetails = !this.showContactDetails; //not equal to condition
  }

  extractOrder(theOrder: Order) {
    if (Utils.isValid(theOrder) && theOrder.status === 'Completed') {
      return;
    }
    this.order = theOrder;
    if (Utils.isValid(theOrder)) {
      this.cartTotal = theOrder.subTotal;
      this.notesToChef = theOrder.notes;
      this.order.items.forEach(item => {
        var found: boolean = false;
        for (var i = 0; i < this.supplierIds.length; i++) {
          if (item.supplier._id === this.supplierIds[i]) {
            found = true;
            this.itemsMap.get(this.supplierIds[i]).push(item);
          }
        }
        if (!found) {
          this.supplierIds.push(item.supplier._id);
          var items: OrderItem[] = [];
          items.push(item);
          this.itemsMap.set(item.supplier._id, items);
        }
      });
      this.fetchSuppliers();
    }
  }
  ngAfterViewInit(): void {
    if (this.stripeService.stripe === undefined) {
      this.stripeService.getStripe().subscribe((s) => {
        console.log(
          'Initializing Stripe card element inside form: ' +
          JSON.stringify(this.stripeService.stripe)
        );
      });
    }
  }

  previous() {
    if (this.showCustomerDetailsSection) {
      this.divHeader = '';
      this.nextButtonText = 'Next';
    } else if (this.showServiceModeSection) {
      this.showCustomerDetailsSection = true;
      this.showServiceModeSection = false;
      this.showItemsSection = false;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.showOrderConfirmation = false;
      this.divHeader = 'Your Details';
      this.nextButtonText = 'Next';
    } else if (this.showItemsSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = true;
      this.showItemsSection = false;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.showOrderConfirmation = false;
      this.divHeader = 'Choose service mode';
      this.nextButtonText = 'Next';
    } else if (this.showPaymentSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = true;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.showOrderConfirmation = false;
      this.divHeader = 'Review Your Items';
      this.nextButtonText = 'Next';
    } else if (this.showStripeSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = false;
      this.showPaymentSection = true;
      this.showStripeSection = false;
      this.showOrderConfirmation = false;
    }
  }

  next() {
    if (this.showCustomerDetailsSection && this.validateCustomerDetails()) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = true;
      this.showItemsSection = false;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.showOrderConfirmation = false;
      this.divHeader = 'Choose service mode';
      this.nextButtonText = 'Next';
    } else if (this.showServiceModeSection && this.validateServiceMode()) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = true;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.showOrderConfirmation = false;
      this.divHeader = 'Review Your Items';
      this.nextButtonText = 'Next';
    } else if (this.showItemsSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = false;
      this.showPaymentSection = true;
      this.showStripeSection = false;
      this.showPlaceOrderButton = true;
      this.showOrderConfirmation = false;
      this.divHeader = 'You Pay';
      this.nextButtonText = 'Proceed to Pay';
    } else if (this.showPaymentSection) {
      return;
    }
  }
  validateCustomerDetails(): boolean {
    if (
      Utils.isEmpty(this.customerName) ||
      Utils.isEmpty(this.customerEmail) ||
      Utils.isEmpty(this.customerMobile)
    ) {
      return false;
    }
    return true;
  }

  validateServiceMode(): boolean {
    if (
      this.serviceMode === 'DELIVERY' &&
      this.addressSelected &&
      Utils.isValid(this.customerAddress) &&
      !Utils.isEmpty(this.customerAddress.addressLine1)
    ) {
      return true;
    }
    if (this.serviceMode === 'COLLECTION') {
      return true;
    }
    return false;
  }

  submitOrder() {

  }

  placeOrder(content) {
    this.loading = true;
    this.orderSubmitted = false;
    this.order.customer.name = this.customerName;
    this.order.customer.email = this.customerEmail;
    this.order.customer.mobile = this.customerMobile;
    this.order.customer.address = this.customerAddress;
    this.order.serviceMode = this.serviceMode;
    this.orderService.saveOrder(this.order).subscribe((e) => {
      if (Utils.isStringValid(e.reference)) {

        if (content) {
          this.orderService.createPaymentIntentForOrder(e).subscribe((pi) => {
            this.paymentIntent = pi;
            console.log('Payment intent ' + JSON.stringify(pi));
            if (this.paymentIntent.error || this.paymentIntent.status === 'succeeded') {
              this.toastService.error(
                'Something is not right. Cannot proceed with this order. Please create new order.'
              );
              this.loading = false;
              this.orderService.destroy();
            } else if (
              this.paymentIntent != null &&
              this.paymentIntent.clientSecret != null &&
              this.paymentIntent.status === 'requires_payment_method'
            ) {
              console.log('Payment intent: ' + this.paymentIntent.id);
              console.log('Payment intent secret: ' + this.paymentIntent.clientSecret);
              console.log('Payment intent status: ' + this.paymentIntent.status);
              this.open(content);
            }
          });
        } else {
          this.orderSubmitted = true;
          this.order = e;
          this.loading = false;
          this.orderConfirmed();
          // this.router.navigateByUrl("your_order?ref="+ );
          // this.orderService.destroy();
        }
      }
    });
  }

  orderConfirmed() {
    this.showCustomerDetailsSection = false;
    this.showServiceModeSection = false;
    this.showItemsSection = false;
    this.showPaymentSection = false;
    this.showOrderConfirmation = true;
  }

  private createCardElement() {
    const style = {
      base: {
        color: '#303238',
        fontSize: '16px',
        border: '1px solid var(--v-border)',
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    };

    this.cardElement = this.stripeElements.create('card', style);
    this.cardElement.mount(this.cardInfo.nativeElement);
    this.cardElement.addEventListener('change', (result: any) => {
      this.enablePayButton = result.complete ? true : false;
      this.cardErrors = result.error && result.error.message;
    });
  }

  createPaymentOptions() {
    const paymentElementOptions = {
      layout: 'tabs',
    };

    const paymentElement = this.stripeElements.create(
      'payment',
      paymentElementOptions
    );
    paymentElement.mount(this.paymentOptions.nativeElement);
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

  selectPickup() {
    this.serviceMode = 'COLLECTION';
    this.order.serviceMode = 'COLLECTION';
    if (this.order.deliveryFee > 0) {
      this.order.deliveryFee = 0;
      this.order.total = this.order.total;
    }
  }

  selectDelivery() {
    this.serviceMode = 'DELIVERY';
    this.order.serviceMode = 'DELIVERY';
    this.order.deliveryFee = 0;//this.supplier.deliveryFee;
    this.order.total = this.order.total + 0;//this.supplier.deliveryFee;
  }

  getAddress(): string {
    var address: string = '';
    return address;
  }

  getOrder(): Order {
    var orderJson = localStorage.getItem('order');
    var order: Order = null;
    if (orderJson !== null && orderJson !== undefined) {
      order = JSON.parse(orderJson);
    }
    return order;
  }

  onSubmitPostcodeLookup(postcodeLookupForm: NgForm) {
    console.log('Search address form submitted..');
    if (postcodeLookupForm.valid) {
      this.doPostcodeLookup(this.addressLookupPostcode);
    }
  }

  doPostcodeLookup(postcode: string) {
    if (postcode === null && postcode === undefined) {
      return;
    }
    this.rapidApiService
      .lookupAddresses(this.addressLookupPostcode.trim())
      // .pipe(first())
      .subscribe(
        (data: RapidApiByPostcodeResponse) => {
          this.postcodeAddressList = data.Summaries;
          this.addressSelected = false;
          console.log(
            'Address Lookup response ' +
            JSON.stringify(this.postcodeAddressList)
          );
        },
        (error) => {
          console.log(
            'Address Lookup resulted an error.' + JSON.stringify(error)
          );
        }
      );
  }

  onSelectDeliveryAddress(selectAddress: RapidApiByPostcodeResponseSummary) {
    var city = selectAddress.Place.split(/[\s ]+/).pop();
    this.customerAddress = {
      city: city,
      addressLine1: selectAddress.StreetAddress,
      addressLine2: selectAddress.Place,
      country: 'UK',
      postcode: this.addressLookupPostcode,
      latitude: '',
      longitude: '',
    };
    this.addressSelected = true;
    this.lookupAddress = false;
  }

  showAddressLookup() {
    this.lookupAddress = true;
    this.customerAddress = undefined;
  }

  findAddress() {
    if (
      this.addressLookupPostcode !== null &&
      this.addressLookupPostcode !== undefined &&
      this.addressLookupPostcode.length > 2
    ) {
      this.doPostcodeLookup(this.addressLookupPostcode);
    }
  }

  cancelAddressLookup() {
    this.lookupAddress = false;
  }

  back() {
    this._location.back();
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => { },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  close() {
    this.modalService.dismissAll();
  }

  async confirmPayment() {
    // e.preventDefault();
    // setLoading(true);
    const elements = this.stripeElements;
    const { error } = await this.stripeService.stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url:
          'http://localhost:5200/order-confirmation/' + this.order.reference,
        receipt_email: 'nava.arul@gmail.com',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    this.cardErrors = error && error.message;
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   this.cardErrors = error && error.message;
    // } else {
    //   this.cardErrors = "An unexpected error occurred.";
    //   showMessage("An unexpected error occurred.");
    // }

    // setLoading(false);
  }

  goback() {
    this._location.back();
  }

  fetchSuppliers() {
    var count = this.supplierIds.length;
    var retrieved = 0;
    this.supplierIds.forEach(id => {
      this.supplierService.getSupplier(id).subscribe(supplier => {
        if (Utils.isValid(supplier)) {
          this.supplierMap.set(id, supplier);
          retrieved = retrieved + 1;
          if (count === retrieved) {
            this.aggregateOrder();
          }
        }
      });
    });
  }

  aggregateOrder() {
    this.supplierMap.forEach((value: Supplier, key: string) => {
      var items: OrderItem[] = this.itemsMap.get(key);
      var total = 0.00;
      items.forEach(it => {
        total = total + it.subTotal;
      });
      total = +(+total).toFixed(2);
      var freeDelivery = false;
      var freeDeliveryShortfall = 0;
      if (total >= value.freeDeliveryOver) {
        freeDelivery = true;
      } else {
        freeDeliveryShortfall = value.freeDeliveryOver - total;
      }
      var supplierBasic: SupplierBasic = {
        _id: value._id,
        name: value.name,
        canClubDelivery: (items.length> 1),
        tradingName: value.tradingName,
        email: value.contact.email,
        mobile: value.contact.mobile,
        telephone: value.contact.telephone
      }
      var checkoutItem: CheckoutItem = {
        freeDelivery: freeDelivery,
        clubShipment: false,
        freeDeliveryShortfall: freeDeliveryShortfall,
        items: items
      }

      this.checkoutItemsMap.set(supplierBasic, checkoutItem);
    });
  }

  clubDelivery(arg0: SupplierBasic, arg1: OrderItem) {
    this.checkoutItemsMap.forEach((value: CheckoutItem, key: SupplierBasic) => {
      if ( key._id === arg0._id){
        var tempItems = value.items;
        tempItems.forEach(i=>{
          if ( i._tempId === arg1._tempId){
            if ( i.clubDelivery){
              i.clubDelivery = false;
            }else{
              i.clubDelivery = true;
            }
          }
        });
        value.items = tempItems;
      }
  });
  }
}



