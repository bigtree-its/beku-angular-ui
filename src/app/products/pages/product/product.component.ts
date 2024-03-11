import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Extra, Product, Size, Variant } from 'src/app/model/products/all';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {



  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute);
  utils = inject(Utils);
  destroy$ = new Subject<void>();
  product: Product;
  error: boolean;
  errorMessage: string;
  productImage: string;

  faPlus = faPlus;
  faMinus = faMinus;
  quantity: number = 1;
  selectedSize: Size;
  selectedColor: Extra;

  ngOnInit(): void {

    var id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Product :' + id)
    if (!this.utils.isEmpty(id)) {
      let observable = this.productService.getProduct(id);
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: (e) => {
          this.product = e;
          console.log('Product ' + JSON.stringify(e));
          if (!this.utils.isValid(e)) {
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

  selectSize(_t31: Size) {
    this.selectedSize = _t31;
  }
  isSelectedSize(s: Size){
    return s.name === this.selectedSize.name;
  }
  selectColor(_t38: Extra) {
    this.selectedColor = _t38;
  }
  isSelectedColor(c: Variant){
    return c.name === this.selectedColor.name;
  }
  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity = this.quantity + 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }

  showImage(_t15: string) {
    this.productImage = _t15;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
