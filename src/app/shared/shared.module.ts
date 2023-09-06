import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { NgbDropdownModule,NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HeaderComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HeaderComponent,
    OrderItemComponent
  ]
})
export class SharedModule { }
