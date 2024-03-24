import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { OrderItem, Product, Variant } from 'src/app/model/products/all';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/products/order.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);
  basketService = inject(BasketService);
  _location = inject(Location);

  utils = inject(Utils);
  destroy$ = new Subject<void>();
  product: Product;
  error: boolean;
  errorMessage: string;
  productImage: string;

  faPlus = faPlus;
  faMinus = faMinus;
  faArrowLeft = faArrowLeft;
  selectedSize: Variant;
  selectedColor: Variant;
  quantity: number = 1;
  subTotal: number = 0.00;

  ngOnInit(): void {

    var id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Product :' + id)
    if (!Utils.isEmpty(id)) {
      let observable = this.productService.getProduct(id);
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: (e) => {
          this.product = e;
          console.log('Product ' + JSON.stringify(e));
          if (!Utils.isValid(e)) {
            this.error = true;
            this.errorMessage =
              'Product not found. Please contact customer support';
          } else {
            this.productImage = this.product.image;
            this.selectedSize = this.product.size;
            this.selectedColor = this.product.color;
          }
        },
        error: (err) => {
          this.error = true;
          this.error = true;
          this.errorMessage =
            'Product not found. Please contact customer support';
        },
      });
    }
  }

  selectSize(_t31: Variant) {
    this.selectedSize = _t31;
  }
  isSelectedSize(s: Variant) {
    return s.name === this.selectedSize.name;
  }
  selectColor(_t38: Variant) {
    this.selectedColor = _t38;
  }
  isSelectedColor(c: Variant) {
    return c.name === this.selectedColor.name;
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity = this.quantity + 1;
      this.calculateSubTotal();
    }
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
      this.calculateSubTotal();
    }
  }

  showImage(_t15: string) {
    this.productImage = _t15;
  }

  addToOrder() {
    if ( this.quantity === 0){
      return;
    }
    this.calculateSubTotal();
    var item: OrderItem = {
      _tempId: Date.now(),
      productId: this.product._id,
      supplier: this.product.supplier,
      image: this.product.image,
      productName: this.product.name,
      quantity: this.quantity,
      deliveryLeadTime: this.product.deliveryLeadTime,
      size: this.selectedSize,
      color: this.selectedColor,
      price: this.product.price,
      subTotal: this.subTotal,
      clubDelivery: false
    };
    console.log('Adding item '+ JSON.stringify(item))
    this.basketService.addToProductOrder(item);
  }

  private calculateSubTotal() {

    this.subTotal = 0;
    this.subTotal = this.subTotal + (this.product.price * this.quantity);
    if (this.selectedColor !== null && this.selectedColor !== undefined) {
      this.subTotal = this.subTotal + this.selectedColor.price;
    }
    if (this.selectedSize !== null && this.selectedSize !== undefined) {
      this.subTotal = this.subTotal + this.selectedSize.price;
    }
    this.subTotal = +(+this.subTotal).toFixed(2);
    console.log('Sub total ' + this.subTotal)
  }

  ngOnDestroy(): void {
    console.log('Destroying component...')
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this._location.back();
  }
}
