import { Component, Input } from '@angular/core';
import { FoodOrderItem } from 'src/app/model/localchef';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderService } from 'src/app/services/food-order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {

  @Input() item: FoodOrderItem;
  @Input() priceMode: String;
  @Input() displayImage: boolean = true;
  @Input() displayDeleteOption: boolean = false;
  quantity: number = 1;
  price: number = 0.00;

  constructor(private orderService: FoodOrderService) { }

  ngOnInit(): void {
    this.price = this.item.price;
    this.quantity = this.item.quantity;
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity = this.quantity + 1;
      this.calculatePrice();
    }
  }

  decreaseQuantity() {
    console.log(this.quantity)
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
      this.calculatePrice();
    }
  }

  private calculatePrice() {
    if ( this.quantity === 0){
        this.orderService.removeItem(this.item);
    }else{
      this.item.subTotal = this.item.price * this.quantity;
      this.item.subTotal = +(+this.item.subTotal).toFixed(2);
      this.item.quantity = this.quantity;
      this.orderService.updateItem(this.item);
    }
    
  }

}
