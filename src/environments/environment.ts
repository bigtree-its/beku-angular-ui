// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

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
  // Auth URLs

  // Local
  LoginUrl:'http://localhost:8081/authenticate/customer/token',
  LogoutUrl: 'http://localhost:8081/api/auth/logout',
  RegisterUrl: 'http://localhost:8081/api/users/signup',
  PasswordResetInitiateUrl:
    'http://localhost:8081/passwords/reset_initiate',
  PasswordResetSubmitUrl:'http://localhost:8081/passwords/reset_submit',
  GetCustomerPreferencesUrl:'http://localhost:8081/api/customers/replace-me/preferences',
  CreateOrUpdateCustomerPreferencesUrl:'http://localhost:8081/api/customers/preferences',
  // Heroku
  // LoginUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/authenticate/customer/token',
  // LogoutUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/api/oauth/logout',
  // RegisterUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/api/users/signup',
  // PasswordResetInitiateUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/passwords/reset_initiate',
  // PasswordResetSubmitUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/passwords/reset_submit',
  // GetCustomerPreferencesUrl:'http://bigtree-auth-service-672f06320174.herokuapp.com/api/customers/replace-me/preferences',
  // CreateOrUpdateCustomerPreferencesUrl:'http://bigtree-auth-service-672f06320174.herokuapp.com/api/customers/preferences',

  // Auth Server: https://stormy-stream-36548-96356ce4833c.herokuapp.com
  // Order Server: https://polar-fortress-28097-08459456d8d7.herokuapp.com


  // CollectionsUrl: "http://localhost:8083/ads/v1/collections",
  // ChefsUrl: "http://localhost:8083/ads/v1/chefs",
  // CuisinesUrl: "http://localhost:8083/ads/v1/cuisines",
  // DishesUrl: "http://localhost:8083/ads/v1/dishes",
  // ServiceAreasUrl: "http://localhost:8083/ads/v1/serviceareas",
  // MenusUrl: "http://localhost:8083/ads/v1/menus",
  // CalendersUrl: "http://localhost:8083/ads/v1/calendars",
  // OrderTrackingUrl: "http://localhost:8080/api/order-tracking",
  // CustomerOrdersUrl: "http://localhost:8080/api/customer-orders",
  // CustomerOrderSearchUrl: "http://localhost:8080/api/customer-orders/search",
  // StripePaymentsUrl: "http://localhost:8080/api/stripe-payments",
  // PaymentIntentUrl: "http://localhost:8080/api/stripe-payments/payment-intent",

  debug: window['env']['debug'] || false,

  /** RapidAPI  */
  X_RapidAPI_Url:
    window['env']['X_RapidAPI_Url'] ||
    'https://samsinfield-postcodes-4-u-uk-address-finder.p.rapidapi.com/ByPostcode/json',
  X_RapidAPI_Host:
    window['env']['X_RapidAPI_Host'] ||
    'samsinfield-postcodes-4-u-uk-address-finder.p.rapidapi.com',
  X_RapidAPI_Key:
    window['env']['X_RapidAPI_Key'] ||
    '249a5c6ab3mshce3cf38f2ca8130p195a93jsn3ad1c6002c20',
  CUSTOMER_APP_ACCESS_TOKEN:
    'eyJhbGciOiJIUzUxMiJ9.eyJmaXJzdE5hbWUiOiJDdXN0b21lckFwcCIsImxhc3ROYW1lIjoiQ3VzdG9tZXJBcHAiLCJjbGllbnRUeXBlIjoiQ3VzdG9tZXJBcHAiLCJtb2JpbGUiOiIwNzk3OTE5MTE3NiIsImN1c3RvbWVySWQiOiI2NThlY2YxYjUyOTAyNDI0OTc2MzYxMDUiLCJleHAiOjE3MzkwNDg0NDIsInN1YiI6IlRoZUN1c3RvbWVyQXBwQGdtYWlsLmNvbSJ9.k0sPPCwRHRjZjh20koEAOSY1UNdNaggQJaqc0TfcmdbhpNIiHOHmtcZxu2Jp3kDSMNCfmoKyQX51eTF71jWWfQ',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
