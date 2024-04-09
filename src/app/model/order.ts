import { Address } from './common-models';
import { PaymentCard } from './payment-card';


export class Order {
    id: number;
    reference: string;
    paymentIntentId: string;
    clientSecret: string;
    status: string;
    date: Date;
    expectedDeliveryDate: Date;
    email: string;
    currency: string;
    paymentReference: string;
    items: OrderItem[];
    address: Address;
    paymentCard: PaymentCard;
    subTotal: number;
    saleTax: number;
    shippingCost: number;
    packagingCost: number;
    discount: number;
    totalCost: number;
    cancellationRequested: boolean;
    cancellationApproved: boolean;
    cancellationDeclined: boolean;
    cancelled: boolean;
}

export class OrderItem {
    id: string;
    image: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    cancellationRequested: boolean;
    cancellationApproved: boolean;
    cancellationDeclined: boolean;
    cancelled: boolean;
}

export class PaymentIntentRequest {
    currency: string;
    amount: number;
    orderReference: string;
    customerEmail: string;
}

export class PaymentIntentResponse {
    id: string;
    intentId: string;
    object: string;
    amount: string;
    orderReference: string;
    clientSecret: string;
    currency: string;
    status: string;
    error: Boolean;
    liveMode: Boolean;
    errorMessage: string;
    paymentMethod: string;
    chargesUrl: string;
    supplier: string;
    metaData: Map<string, string>;
}