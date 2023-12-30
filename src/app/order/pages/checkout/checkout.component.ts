import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RapidApiByPostcodeResponse, RapidApiByPostcodeResponseSummary } from 'src/app/model/address';
import { CustomerOrder, FoodOrder, LocalChef } from 'src/app/model/localchef';
import { ContextService } from 'src/app/services/context.service';
import { RapidApiService } from 'src/app/services/rapid-api.service';
import { Utils } from 'src/app/services/utils';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeService } from 'src/app/services/stripe.service';
import { Observable } from 'rxjs';
import {crypto} from 'crypto-js';
import { PaymentIntentResponse } from 'src/app/model/order';
import { Address } from 'src/app/model/common-models';
import { FoodOrderService } from 'src/app/services/food-order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  @ViewChild('stripeContent', { read: ElementRef }) public stripeContent: ElementRef<any>;
  @ViewChild('cardInfo', { read: ElementRef }) public cardInfo: ElementRef<any>;
  @ViewChild('#payment-element', { read: ElementRef }) public paymentOptions: ElementRef<any>;
  @ViewChild('cardErrors', { read: ElementRef }) public cardErrors: ElementRef<any>;
  @ViewChild('payment-message', { read: ElementRef }) public paymentMessage: ElementRef<any>;

  enablePayButton: boolean = false;

  customerMobile: string = "";
  customerEmail: string = "";
  customerName: string = "";
  notesToChef: string = "";

  divHeader: string = "";
  nextButtonText: string = "Next";
  showCustomerDetailsSection: boolean = true;
  showServiceModeSection: boolean = false;
  showItemsSection: boolean = false;
  showPaymentSection: boolean = false;
  showStripeSection: boolean = false;
  showPlaceOrderButton: boolean = false;

  serviceMode: string = "COLLECTION";
  customerAddress: Address;
  addressLookupPostcode: string;
  hidePostcodeLookupForm: boolean;
  postcodeAddressList: RapidApiByPostcodeResponseSummary[];
  rapidApiByPostcodeResponseSummary: RapidApiByPostcodeResponseSummary;
  postcode: string;
  addressSelected: boolean;
  lookupAddress: boolean = true;

  cartTotal: number = 0;
  order: CustomerOrder;
  chef: LocalChef;
  price: number = 0.00;

  stripeElements: any;
  cardElement: any;
  paymentIntent: PaymentIntentResponse;

  constructor(private contextService: ContextService,
    private utils: Utils,
    private rapidApiService: RapidApiService,
    private stripeService: StripeService,
    private _location: Location,
    private modalService: NgbModal,
    private orderService: FoodOrderService,
    private router: Router) {
  }

  public loadStripe$: Observable<any> = this.stripeService.LoadStripe();

  ngOnInit(): void {
    this.loadStripe$.subscribe(s => {
      console.log('Loaded stripe: ' + s)
    });

    this.contextService.orderSubject.subscribe(theOrder => {
      if ( this.utils.isValid(theOrder) && theOrder.status === "Completed"){
        return;
      }
      this.order = theOrder;
      if (theOrder !== null && theOrder !== undefined) {
        this.cartTotal = theOrder.subTotal;
        this.notesToChef= theOrder.notes;
        if (theOrder.items === null || theOrder.items === undefined || theOrder.items.length === 0) {
          if (this.chef !== null && this.chef !== undefined) {
            this.router.navigate(['cooks', this.chef._id]).then();
          }
        }
      } else {
        this.order = this.getOrder();
        this.cartTotal = this.order.subTotal;
      }
    });
    this.contextService.chefSubject.subscribe(theChef => {
      this.chef = theChef;
      if (theChef !== null && theChef !== undefined) {
        console.log('The chef: ' + JSON.stringify(theChef))
      } else {
        this.chef = this.getChef();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.stripeService.stripe === undefined) {
      this.stripeService.getStripe().subscribe(s => {
        console.log('Initializing Stripe card element inside form: ' + this.stripeService.stripe);
      });
    } 
  }

  previous() {
    if (this.showCustomerDetailsSection) {
      return;
    } else if (this.showServiceModeSection) {
      this.showCustomerDetailsSection = true;
      this.showServiceModeSection = false;
      this.showItemsSection = false;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.divHeader = "Your Details";
      this.nextButtonText = "Next";
    } else if (this.showItemsSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = true;
      this.showItemsSection = false;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.divHeader = "Choose service mode";
      this.nextButtonText = "Next";
    } else if (this.showPaymentSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = true;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.divHeader = "Review Your Items";
      this.nextButtonText = "Next";
    } else if (this.showStripeSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = false;
      this.showPaymentSection = true;
      this.showStripeSection = false;
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
      this.divHeader = "Choose service mode";
      this.nextButtonText = "Next";
    } else if (this.showServiceModeSection && this.validateServiceMode()) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = true;
      this.showPaymentSection = false;
      this.showStripeSection = false;
      this.showPlaceOrderButton = false;
      this.divHeader = "Review Your Items";
      this.nextButtonText = "Next";
    } else if (this.showItemsSection) {
      this.showCustomerDetailsSection = false;
      this.showServiceModeSection = false;
      this.showItemsSection = false;
      this.showPaymentSection = true;
      this.showStripeSection = false;
      this.showPlaceOrderButton = true;
      this.divHeader = "You Pay";
      this.nextButtonText = "Proceed to Pay";
    } else if (this.showPaymentSection) {
      return;
    }
  }
  validateCustomerDetails(): boolean {
    if (this.utils.isEmpty(this.customerName)
      || this.utils.isEmpty(this.customerEmail)
      || this.utils.isEmpty(this.customerMobile)
    ) {
      return false;
    }
    return true;
  }

  validateServiceMode(): boolean {
    if (this.serviceMode === 'DELIVERY' && this.addressSelected &&
      this.utils.isValid(this.customerAddress) && !this.utils.isEmpty(this.customerAddress.addressLine1)
    ) {
      return true;
    }
    if (this.serviceMode === 'COLLECTION') {
      return true;
    }
    return false;
  }

  placeOrder(content) {
    this.order.customer.name = this.customerName;
    this.order.customer.email = this.customerEmail;
    this.order.customer.mobile = this.customerMobile;
    this.order.customer.address = this.customerAddress;
    this.order.serviceMode = this.serviceMode;
    this.order.notes = this.notesToChef;
    this.orderService.saveOrder(this.order).subscribe(e => {
      if (this.utils.isStringValid(e.reference)) {
        this.contextService.publishOrder(e);
        this.orderService.createPaymentIntentForOrder(e).subscribe(pi => {
          this.paymentIntent = pi;
          this.open(content)
        });
      }
    });
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
    this.cardElement.addEventListener("change", (result: any) => {
      this.enablePayButton = (result.complete) ? true : false;
      this.cardErrors = result.error && result.error.message;
    });
  }

  createPaymentOptions(){
    const paymentElementOptions = {
      layout: "tabs",
    };
  
    const paymentElement = this.stripeElements.create("payment", paymentElementOptions);
    paymentElement.mount(this.paymentOptions.nativeElement);
  }

  ngOnDestroy() {
    if (this.cardElement) {
      this.cardElement.removeEventListener("change", (result: any) => {
        this.cardErrors = result.error && result.error.message;
        this.cardElement.destroy();
      });
    }
  }

  selectPickup() {
    this.serviceMode = "COLLECTION";
    this.order.serviceMode = "COLLECTION";
    if ( this.order.deliveryFee > 0){
      this.order.deliveryFee = 0;
      this.order.total = this.order.total - this.chef.deliveryFee;
    }
  }

  selectDelivery() {
    this.serviceMode = "DELIVERY";
    this.order.serviceMode = "DELIVERY";
    this.order.deliveryFee = this.chef.deliveryFee;
    this.order.total = this.order.total + this.chef.deliveryFee;
  }

  getAddress(): string {
    var address: string = ""
    if (this.chef !== null && this.chef !== undefined) {
      return this.utils.getChefAddress(this.chef);
    }
    return address;
  }


  getOrder(): CustomerOrder {
    var orderJson = localStorage.getItem('order');
    var order: CustomerOrder = null;
    if (orderJson !== null && orderJson !== undefined) {
      order = JSON.parse(orderJson);
    }
    return order;
  }

  getChef(): LocalChef {
    var chefJson = localStorage.getItem('chef');
    var chef: LocalChef = null;
    if (chefJson !== null && chefJson !== undefined) {
      chef = JSON.parse(chefJson);
    }
    return chef;
  }

  onSubmitPostcodeLookup(postcodeLookupForm: NgForm) {
    console.log('Search address form submitted..')
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
          console.log('Address Lookup response ' + JSON.stringify(this.postcodeAddressList))
        },
        (error) => {
          console.log('Address Lookup resulted an error.' + JSON.stringify(error));
        }
      );
  }

  onSelectDeliveryAddress(selectAddress: RapidApiByPostcodeResponseSummary) {
    var city = selectAddress.Place.split(/[\s ]+/).pop();
    this.customerAddress = {
      city: city,
      addressLine1 :selectAddress.StreetAddress,
      addressLine2 : selectAddress.Place,
      country: 'UK',
      postcode: this.addressLookupPostcode,
      latitude: '',
      longitude: ''
    };
    this.addressSelected = true;
    this.lookupAddress = false;
  }

  showAddressLookup() {
    this.lookupAddress = true;
  }

  findAddress() {
    if (this.addressLookupPostcode !== null && this.addressLookupPostcode !== undefined && this.addressLookupPostcode.length > 2) {
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
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
        return_url: "http://localhost:5200/order-confirmation/"+ this.order.reference,
        receipt_email: "nava.arul@gmail.com",
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

  goback(){
    this._location.back();
  }

}

