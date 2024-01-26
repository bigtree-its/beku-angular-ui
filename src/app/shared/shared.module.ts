import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { NgbDropdownModule,NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home';
import { FooterComponent } from './pages/footer/footer.component';
import { PopupComponent } from './pages/popup/popup.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCopyright, fas } from '@fortawesome/free-solid-svg-icons';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OrderItemComponent,
    FooterComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OrderItemComponent
  ]
})
export class SharedModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCopyright);
  }
}
