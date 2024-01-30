import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared';
import { OrderModule } from './order';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthModule } from './auth';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    AuthModule,
    AdminModule,
    SharedModule,
    OrderModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Time to close the toaster (in milliseconds)
      positionClass: 'toast-top-right', // Toast position
      closeButton: false, // Show close button
      progressBar: false, // Show progress bar
    }),
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
