export interface Group {
    _id: string;
    name: string;
    image: string;
    slug: string;
    active: Boolean;
}

export interface Product {
    _id: string;
    name: string;
    description: string[],
    image: string;
    slug: string;
    group: string;
    supplier: string;
    size: Size;
    sizes: Size[];
    color: Extra;
    colors: Extra[];
    varients: Extra[];
    material: string;
    careInstruction: string;
    storageInstruction: string;
    shippingAndReturns: string;
    gallery: string[];
    price: number;
    priceOld: number;
    dateAdded: Date;
    details: string[];
    featured: Boolean;
    preOrder: Boolean;
    discontinued: Boolean;
    collectionOnly: Boolean;
    active: Boolean;
}

export interface Feedback {
    _id: string;
    product: string;
    rating: number;
    title: string;
    comment: string;
    customer: Customer;
    order: string,
    date: Date
}
export interface Customer {
    _id: string,
    name: string,
    email: string,
    mobile: string,
    telephone: string
}

export interface Contact {
    person: string,
    email: string,
    mobile: string,
    telephone: string
}

export interface Supplier {
    _id: string,
    name: string,
    tradingName: string,
    description: string[],
    image: string,
    slug: string,
    email: string,
    address: Address,
    deliveryFee: number,
    freeDeliveryOver: number,
    packagingFee: number,
    deliveryMinimum: number,
    deliveryDistance: number,
    minimumOrder: number,
    rating: number,
    reviews: number,
    doDelivery: Boolean,
    preOrderOnly: Boolean,
    paymentRequireApproval: Boolean,
    active: Boolean,
    contact: Contact,
}

export interface  Address {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
    latitude: string;
    longitude: string;
}

export interface Extra {
    name: string,
    price: number,
}

export interface Size {
    name: string,
    price: number,
    details: string[],
}