import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsHomeComponent } from './pages/foods-home/foods-home.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChefListComponent } from './pages/chef-list/chef-list.component';
import { ChefHomeComponent } from './pages/chef-home/chef-home.component';
import { FoodItemComponent } from './pages/food-item/food-item.component';
import { FoodBasketComponent } from './pages/food-basket/food-basket.component';
import { FoodCheckoutComponent } from './pages/food-checkout/food-checkout.component';
import { FoodOrderConfirmationComponent } from './pages/food-order-confirmation/food-order-confirmation.component';
import { SharedModule } from '../shared';
import { PaymentsModule } from '../payments';

const routes: Routes = [
  { path: 'f/home', component: FoodsHomeComponent },
  { path: 'f/chef-list', component: ChefListComponent },
  { path: 'f/chef/:id', component: ChefHomeComponent },
  { path: 'f/basket', component: FoodBasketComponent },
  { path: 'f/checkout', component: FoodCheckoutComponent },
]

@NgModule({
  declarations: [
    FoodsHomeComponent,
    ChefListComponent,
    ChefHomeComponent,
    FoodBasketComponent,
    FoodItemComponent,
    FoodCheckoutComponent,
    FoodOrderConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class FoodsModule { }
