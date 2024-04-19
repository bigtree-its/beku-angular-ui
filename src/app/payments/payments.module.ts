import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakePaymentComponent } from './pages/make-payment/make-payment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from './pages';

const routes: Routes = [
  { path: 'make_payment', component: MakePaymentComponent }
]

@NgModule({
  declarations: [
    MakePaymentComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PaymentFormComponent
  ]
})
export class PaymentsModule { }
