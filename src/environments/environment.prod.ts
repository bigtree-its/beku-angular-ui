export const environment = {
  production: true,

  CURRENCY: 'GBP',
  CURRENCY_SYMBOL: '£',

  CollectionsUrl:
    'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/collections',
  ChefsUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/chefs',
  CuisinesUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/cuisines',
  DishesUrl: 'http://chef-service-1b2023ebc956.herokuapp.com/ads/v1/dishes',
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
    'https://stormy-stream-36548-96356ce4833c.herokuapp.com/api/auth/login',
  LogoutUrl:
    'https://stormy-stream-36548-96356ce4833c.herokuapp.com/api/auth/logout',
  RegisterUrl:
    'https://stormy-stream-36548-96356ce4833c.herokuapp.com/api/users/register',
  PasswordResetInitiateUrl:
    'https://stormy-stream-36548-96356ce4833c.herokuapp.com/api/users/password-reset/initiate',
  PasswordResetSubmitUrl:
    'https://stormy-stream-36548-96356ce4833c.herokuapp.com/api/users/password-reset/submit',

  debug: window['env']['debug'] || false,

  /** RapidAPI  */
  X_RapidAPI_Url: window['env']['X_RapidAPI_Url'],
  X_RapidAPI_Key: window['env']['X_RapidAPI_Key'],
  PostCode4U_Key: window['env']['PostCode4U_Key'],
  X_RapidAPI_Username: window['env']['X_RapidAPI_Username'],
  X_RapidAPI_Host: window['env']['X_RapidAPI_Host'],
  CUSTOMER_APP_ACCESS_TOKEN:
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2MtY2FwcC0zMTUyNjQiLCJpc3MiOiJ3d3cuYXV0aC5ob2MuY29tIiwiaWF0IjoxNzAzODc3MDI0LCJleHAiOjE3MzUzNDQwMDB9.Mdw14EyUbfIZkWh5Td5EuJRg_avzI6NM6D9tStM_64g3pm49fAl2Jt9DgZgtfCH4vt1VVxwkudikybCD5Eap2w',
};
