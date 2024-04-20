import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { NgbDropdownModule,NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home';
import { FooterComponent } from './pages/footer/footer.component';
import { PopupComponent } from './pages/popup/popup.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCopyright, fas } from '@fortawesome/free-solid-svg-icons';
import { ReviewItemComponent } from './pages/review-item/review-item.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { DateCalcPipe } from '../pipes/date-ago.pipe';
import { WriteReviewComponent } from './pages/write-review/write-review.component';
import { AuthGuard } from '../services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'write_review', component: WriteReviewComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OrderItemComponent,
    FooterComponent,
    PopupComponent,
    ReviewItemComponent,
    DateAgoPipe,
    WriteReviewComponent,
    AboutUsComponent,
    ConfirmationDialogComponent,
    PaymentFormComponent,
  ],
  imports: [
    NgbToastModule,
    CommonModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OrderItemComponent,
    PaymentFormComponent,
    ReviewItemComponent,
  ]
})
export class SharedModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCopyright);
  }
}
