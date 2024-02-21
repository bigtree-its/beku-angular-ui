import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakePaymentComponent } from './pages/make-payment/make-payment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { StripeformComponent } from './pages';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'make_payment', component: MakePaymentComponent }
]

@NgModule({
  declarations: [
    MakePaymentComponent,
    StripeformComponent
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
  ],
  exports: [
    StripeformComponent
  ]
})
export class PaymentsModule { }
