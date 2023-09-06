import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerOrder } from 'src/app/model/localchef';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderservice } from 'src/app/services/food-order.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {


  order: CustomerOrder;
  redirect_status: any;

  constructor(private activatedRoute: ActivatedRoute,
    private orderService: FoodOrderservice,
    private ctxService: ContextService,
    private utils: Utils,
    ){

  }

  // Stripe returns to this url:
  //http://localhost:4200/order-confirmation/7a022f19-d82f-4b8a-9525-86a768af35b0?
  //payment_intent=pi_3Nkt1IJtRMxkXWc31hypLmHB&
  //payment_intent_client_secret=pi_3Nkt1IJtRMxkXWc31hypLmHB_secret_zD9W7MrKPXyS2awWy2vUQVnvp&
  //redirect_status=succeeded

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const reference = params['reference'];
      this.order = this.ctxService.getOrder();
      if ( this.utils.isValid(this.order) && reference === this.order.reference){
        this.order.status = "Confirmed";
        this.ctxService.publishOrder(null);
      }
    });
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params); 
        this.redirect_status = params['redirect_status'];
        console.log(this.redirect_status); 
      }
    );
  }
}
