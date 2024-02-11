import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceLocator {
  collectionsUrl: string = '';
  chefsUrl: string;
  cuisinesUrl: string;
  DishesUrl: string;
  menusUrl: string;
  ServiceAreasUrl: string;
  calendersUrl: string;
  OrderTrackingUrl: string;
  CustomerOrdersUrl: string;
  PaymentIntentUrl: string;
  StripePaymentsUrl: string;
  CustomerOrderSearchUrl: string;
  LoginUrl: string;
  LogoutUrl: string;
  RegisterUrl: string;
  PasswordResetInitiateUrl: string;
  PasswordResetSubmitUrl: string;
  ReviewsUrl: string;
  GetCustomerPreferencesUrl: string;
  CreateOrUpdateCustomerPreferencesUrl: string;
  CreateContactsUrl: string;
  UpdatePersonalDetails: string;

  constructor() {
    this.collectionsUrl = environment.CollectionsUrl;
    this.chefsUrl = environment.ChefsUrl;
    this.cuisinesUrl = environment.CuisinesUrl;
    this.DishesUrl = environment.DishesUrl;
    this.ServiceAreasUrl = environment.ServiceAreasUrl;
    this.menusUrl = environment.MenusUrl;
    this.calendersUrl = environment.CalendersUrl;
    this.OrderTrackingUrl = environment.OrderTrackingUrl;
    this.CustomerOrdersUrl = environment.CustomerOrdersUrl;
    this.CustomerOrderSearchUrl = environment.CustomerOrderSearchUrl;
    this.PaymentIntentUrl = environment.PaymentIntentUrl;
    this.StripePaymentsUrl = environment.StripePaymentsUrl;
    this.LoginUrl = environment.LoginUrl;
    this.LogoutUrl = environment.LogoutUrl;
    this.RegisterUrl = environment.RegisterUrl;
    this.PasswordResetInitiateUrl = environment.PasswordResetInitiateUrl;
    this.PasswordResetSubmitUrl = environment.PasswordResetSubmitUrl;
    this.ReviewsUrl = environment.ReviewsUrl;
    this.GetCustomerPreferencesUrl = environment.GetCustomerPreferencesUrl;
    this.CreateOrUpdateCustomerPreferencesUrl = environment.CreateOrUpdateCustomerPreferencesUrl;
    this.CreateContactsUrl = environment.CreateContactsUrl;
    this.UpdatePersonalDetails = environment.UpdatePersonalDetails;
  }
}
