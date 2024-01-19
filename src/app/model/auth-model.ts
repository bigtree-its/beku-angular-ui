export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    userType: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    userType: string;
}

export interface LogoutRequest {
    userId: string;
}

export interface Errors {
    errors: { [key: string]: string };
}

export interface LoginResponse {
    idToken: string;
    accessToken: string;
    message: string;
    success: Boolean;
}

export class User{
    id: string;
    name: string;
    email: string;
    mobile: string;
}

export interface PasswordResetInitiate {
    email: string;
    action: string;
}

export interface PasswordResetSubmit {
    email: string;
    otp: string;
    password: string;
}

export interface ApiResponse {
    endpoint: string;
    message: string;
}

export class Review {
    _id: string;
    chefId: string;
    customerName: string;
    customerEmail: string;
    title: string;
    comment: string;
    orderReference: string;
    overAllRating: number;
    quantityRating: number;
    qualityRating: number;
    hygieneRating: number;
}

export class Supplier {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    address: Address;
}

export class Customer {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    address: Address;
}

export class Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
    country: string;
    latitude: string;
    longitude: string;
}



