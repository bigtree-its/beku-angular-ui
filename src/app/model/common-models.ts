export interface ProductQuestion {
    _id: string;
    entity: string;
    question: string;
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    date: Date;
}

export interface ProductAnswer {
    _id: string;
    question: string;
    answer: string;
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    date: Date;
}

export interface ProductQAA {
    id: string;
    answer: string;
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    date: Date;
}
export interface ProductQAQ {
    id: string;
    question: string;
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    date: Date;
}

export interface ProductQA {
    entity: string;
    questions: ProductQAQ[];
}

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    contact: Contact;
    address: Address
}

export interface Address {
    addressLine1: string;
    city: string;
    postcode: string;
    country: string;
    latitude: string;
    longitude: string;
    addressLine2: string;
}

export interface User {
    id: string;
    email: string;
    role: string;
    fullName: string;
    contact: Contact;
    address: Address
}

export interface Contact {
    telephone: string;
    mobile: string;
}

export interface ChefContact {
    telephone: string;
    mobile: string;
    email: string;
    fullName: string;
}

export interface UserSession {
    user: User;
    session: Session;
    success: boolean;
    message: string;
    status: number;
}
export interface Day {
    date: number;
    day: string;
    month: string;
}


export interface CustomerSession {
    session: Session;
    customer: Customer;
    success: boolean;
    message: string;
}

export interface Session {
    id: string;
    email: string;
    ipAddress: string;
    accessToken: string;
    start: Date;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LogoutRequest {
    email: string;
    session: string;
}


export interface SignupRequest {
    email: string
    password: string;
    mobile: string;
    fullName: string;
    role: string;
}


export interface ResetPasswordRequest {
    email: string;
    password: string;
    otp: string;
}

export interface VerifyIdentityRequest {
    email: string
    passCode: string;
}

export interface VerifyIdentityResponse {
    email: string
    jwt: string;
}

export interface BooleanResponse {
    value: boolean
}

