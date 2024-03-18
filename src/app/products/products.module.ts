import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupListComponent, ProductDetailComponent, ProductListComponent } from './pages';

const routes: Routes = [
  { path: 'p/groups/:dept', component: GroupListComponent },
  { path: 'p/products', component: ProductListComponent },
  { path: 'p/product-detail/:id', component: ProductDetailComponent },
  { path: 'p/checkout', component: CheckoutComponent },
  { path: 'p/cart', component: CartComponent },
]
@NgModule({
  declarations: [
    GroupListComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
