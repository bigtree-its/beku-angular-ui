import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CheflistComponent } from './pages/cheflist/cheflist.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { NgbDropdownModule,NgbDatepickerModule, NgbToastModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ChefHomeComponent } from './pages/chefhome/chefhome.component';
import { MenuItemComponent } from './pages/menu-item/menu-item.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cooks', component: CheflistComponent },
  { path: 'cooks/:id', component: ChefHomeComponent },
  { path: 'sandbox', component: SandboxComponent },
]

// We are keeping the Routes in the module itself. 
// You can create a separate routing module similar to the AppRoutingModule. 
// That will help to keep the HomeModule code clean

// The RouterModule module is imported and routes are registered with the call to forChild(routes). forChild registered the routes but does not register any services.

// We decorate the HomeModule class with @NgModule to let Angular know that it is an Angular Module
@NgModule({
  // use the declarations array to declare the three components that we have created.
  declarations: [
    HomeComponent,
    CheflistComponent,
    ChefHomeComponent,
    MenuItemComponent,
    SandboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbToastModule,
    FontAwesomeModule,
    NgbCarouselModule,
    RouterModule.forChild(routes)
  ],
  // The HomeModule do not expose any services, hence we keep the providers array empty
  providers: []
})
export class HomeModule { }
