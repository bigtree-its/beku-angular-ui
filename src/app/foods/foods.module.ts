import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsHomeComponent } from './pages/foods-home/foods-home.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'foods/home', component: FoodsHomeComponent }
]

@NgModule({
  declarations: [
    FoodsHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class FoodsModule { }
