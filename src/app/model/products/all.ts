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
  description: string[];
  image: string;
  slug: string;
  group: string;
  supplier: string;
  size: Size;
  sizes: Size[];
  color: Variant;
  colors: Variant[];
  variants: Variant[];
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

export interface OrderQuery {
  reference?: string;
  customerEmail?: string;
  supplierId?: string;
  orderId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  all?: boolean;
}

export interface Order {
  id: string;
  customer: Customer;
  reference: string;
  status?: string;
  currency: string;
  serviceMode: string;
  items: OrderItem[];
  subTotal: number;
  total: number;
  deliveryFee: number;
  packingFee: number;
  serviceFee: number;
  dateCreated: Date;
  collectBy: Date;
  dateDeleted: Date;
  expectedDeliveryDate: Date;
  dateAccepted: Date;
  dateDelivered: Date;
  dateCollected: Date;
  notes: string;
}

export interface OrderItem {
  _tempId: number;
  image: string;
  productId: string;
  supplierId: string;
  productName: string;
  quantity: number;
  price: number;
  size: Variant;
  color: Variant;
  subTotal: number;
  specialInstruction: string;
}

export interface Feedback {
  _id: string;
  product: string;
  rating: number;
  title: string;
  comment: string;
  customer: Customer;
  order: string;
  date: Date;
}
export interface Customer {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  telephone?: string;
  address: Address;
}

export interface Contact {
  person: string;
  email: string;
  mobile: string;
  telephone: string;
}

export interface Supplier {
  _id: string;
  name: string;
  tradingName: string;
  description: string[];
  image: string;
  slug: string;
  email: string;
  address: Address;
  deliveryFee: number;
  freeDeliveryOver: number;
  packagingFee: number;
  deliveryMinimum: number;
  deliveryDistance: number;
  minimumOrder: number;
  rating: number;
  reviews: number;
  doDelivery: Boolean;
  preOrderOnly: Boolean;
  paymentRequireApproval: Boolean;
  active: Boolean;
  contact: Contact;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
  latitude: string;
  longitude: string;
}

export interface Variant {
  name: string;
  price: number;
  detail: string;
}

export interface Size {
  name: string;
  price: number;
  details: string[];
}
