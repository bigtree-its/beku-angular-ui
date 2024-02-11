export const environment = {
  production: true,

  CURRENCY: 'GBP',
  CURRENCY_SYMBOL: '£',

  CollectionsUrl:
    'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/collections',
  ChefsUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/chefs',
  CuisinesUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/cuisines',
  DishesUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/dishes',
  ReviewsUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/reviews',
  ServiceAreasUrl:
    'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/serviceareas',
  MenusUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/menus',
  CalendersUrl:
    'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/calendars',
  OrderTrackingUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/order-tracking',
  CustomerOrdersUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/customer-orders',
  CustomerOrderSearchUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/customer-orders/search',
  StripePaymentsUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/stripe-payments',
  PaymentIntentUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/stripe-payments/payment-intent',

  LoginUrl:
    'https://bigtree-auth-service-672f06320174.herokuapp.com/authenticate/customer/token',
  LogoutUrl:
    'https://bigtree-auth-service-672f06320174.herokuapp.com/api/auth/logout',
  RegisterUrl:
    'https://bigtree-auth-service-672f06320174.herokuapp.com/api/users/signup',
  PasswordResetInitiateUrl:
    'https://bigtree-auth-service-672f06320174.herokuapp.com/passwords/reset_initiate',
  PasswordResetSubmitUrl:
    'https://bigtree-auth-service-672f06320174.herokuapp.com/passwords/reset_submit',

  GetCustomerPreferencesUrl:
    'http://bigtree-auth-service-672f06320174.herokuapp.com/api/customers/replace-me/preferences',
  CreateOrUpdateCustomerPreferencesUrl:
    'http://bigtree-auth-service-672f06320174.herokuapp.com/api/customers/preferences',
  CreateContactsUrl:
    'http://bigtree-auth-service-672f06320174.herokuapp.com/api/contacts',
  UpdatePersonalDetails:
    'http://http://bigtree-auth-service-672f06320174.herokuapp.com/api/users/update_personal',

  debug: window['env']['debug'] || false,

  /** RapidAPI  */
  X_RapidAPI_Url: window['env']['X_RapidAPI_Url'],
  X_RapidAPI_Key: window['env']['X_RapidAPI_Key'],
  PostCode4U_Key: window['env']['PostCode4U_Key'],
  X_RapidAPI_Username: window['env']['X_RapidAPI_Username'],
  X_RapidAPI_Host: window['env']['X_RapidAPI_Host'],
  CUSTOMER_APP_ACCESS_TOKEN:
    'eyJhbGciOiJIUzUxMiJ9.eyJmaXJzdE5hbWUiOiJDdXN0b21lckFwcCIsImxhc3ROYW1lIjoiQ3VzdG9tZXJBcHAiLCJjbGllbnRUeXBlIjoiQ3VzdG9tZXJBcHAiLCJtb2JpbGUiOiIwNzk3OTE5MTE3NiIsImN1c3RvbWVySWQiOiI2NThlY2YxYjUyOTAyNDI0OTc2MzYxMDUiLCJleHAiOjE3MzkwNDg0NDIsInN1YiI6IlRoZUN1c3RvbWVyQXBwQGdtYWlsLmNvbSJ9.k0sPPCwRHRjZjh20koEAOSY1UNdNaggQJaqc0TfcmdbhpNIiHOHmtcZxu2Jp3kDSMNCfmoKyQX51eTF71jWWfQ',
};
