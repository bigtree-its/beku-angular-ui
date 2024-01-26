import { Customer } from "./auth-model";

export class Review {
    chef: string;
    order: string;
    title: string;
    comment: string;
    date: Date;
    rating: number;
    customer: Customer;
}