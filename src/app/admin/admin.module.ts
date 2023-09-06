import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: UsersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'partners', component: PartnersComponent }
]


@NgModule({
  declarations: [
    UsersComponent,
    SuppliersComponent,
    PartnersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
