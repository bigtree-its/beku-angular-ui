import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { NgbDropdownModule,NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home';
import { FooterComponent } from './pages/footer/footer.component';
const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OrderItemComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OrderItemComponent
  ]
})
export class SharedModule { }
