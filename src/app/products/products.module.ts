import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './pages/groups/groups.component';
import { ProductComponent } from './pages/product/product.component';
import { GroupComponent } from './pages/group/group.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'p/groups', component: GroupsComponent },
  { path: 'p/groups/:id', component: GroupComponent },
  { path: 'p/products/:id', component: ProductComponent },
  { path: 'p/checkout', component: CheckoutComponent },
  { path: 'p/cart', component: CartComponent },
]
@NgModule({
  declarations: [
    GroupsComponent,
    ProductComponent,
    GroupComponent,
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
