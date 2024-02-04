import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './pages/basket/basket.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StripeformComponent } from './pages/stripeform/stripeform.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'basket', component: BasketComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation/:reference', component: OrderConfirmationComponent }
]

@NgModule({
  declarations: [
    BasketComponent,
    CheckoutComponent,
    StripeformComponent,
    OrderConfirmationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }
