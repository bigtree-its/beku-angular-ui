import { Component, Input } from '@angular/core';
import { Extra, Food, FoodOrderItem } from 'src/app/model/localchef';
import { FoodOrderservice } from 'src/app/services/food-order.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/services/utils';
import { Day } from 'src/app/model/common-models';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input() food?: Food;
  @Input() displayOrderBy?: Boolean = false;
  @Input() displayDescription?: Boolean = false;
  @Input() orderBy?: Date = new Date();
  price: number = 0.00;
  specialInstruction: string | undefined;
  selectedchoice?: Extra;
  selectedExtras: Extra[] = [];
  quantity: number = 1;
  ordeByDate: Day;

  constructor(private foodOrderService: FoodOrderservice,
    private utils: Utils,
    private modalService: NgbModal) { 
      
    }


  ngOnInit() {
    this.price = this.food.price;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  close() {
    this.modalService.dismissAll();
  }

  handleChoiceSelection(e: any) {
    if (this.food !== null && this.food !== undefined) {
      this.food.choices.forEach(choice => {
        if (choice.name === e.target.value) {
          if (this.selectedchoice === null || this.selectedchoice === undefined) {
            this.selectedchoice = choice;
            this.price = this.price + (this.selectedchoice.price * this.quantity);
            this.price = +(+this.price).toFixed(2);
          } else {
            // Remore Previously Added Choice
            this.price = this.price - (this.selectedchoice.price * this.quantity);
            this.price = +(+this.price).toFixed(2);
            // Add New Choice
            this.selectedchoice = choice;
            this.price = this.price + (this.selectedchoice.price * this.quantity);
            this.price = +(+this.price).toFixed(2);
          }
        }
      })
    }
  }

  selectExtra(extraClicked: string, e: any) {
    if (this.food !== null && this.food !== undefined) {
      this.food.extras.forEach(item => {
        if (item.name === extraClicked) {
          if (e.target.checked) {
            this.selectedExtras.push(item);
            this.price = this.price + (item.price * this.quantity);
            this.price = +(+this.price).toFixed(2);
          } else {
            for (var i = 0; i < this.selectedExtras.length; i++) {
              var ex = this.selectedExtras[i];
              if (ex.name === extraClicked) {
                this.selectedExtras.splice(i, 1);
                this.price = this.price - (ex.price * this.quantity);
                this.price = +(+this.price).toFixed(2);
              }
            }
          }
        }
      })
    }
  }
  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity = this.quantity + 1;
      this.calculatePrice();
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
      this.calculatePrice();
    }
  }

  private calculatePrice() {
    var extraTotal = 0;
    for (var i = 0; i < this.selectedExtras.length; i++) {
      extraTotal = extraTotal + this.selectedExtras[i].price;
    }
    if (this.selectedchoice !== null && this.selectedchoice !== undefined) {
      extraTotal = extraTotal + this.selectedchoice.price;
    }
    if (this.food !== null && this.food !== undefined) {
      this.price = (this.food.price + extraTotal) * this.quantity;
      this.price = +(+this.price).toFixed(2);
    }

  }

  addToOrder() {
    console.log('Add to Order: ');
    var foodOrderItem: FoodOrderItem = {
      _tempId: Date.now(),
      id: this.food._id,
      image: this.food.image,
      name: this.food.name,
      quantity: this.quantity,
      price: this.food.price,
      subTotal: this.price,
      extras: this.selectedExtras,
      choice: this.selectedchoice,
      specialInstruction: this.specialInstruction
    };
    this.foodOrderService.addToOrder(foodOrderItem);
    this.close();
  }
}
