import { Component, Input } from '@angular/core';
import { Extra, FoodOrderItem, Menu } from 'src/app/model/localchef';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/services/utils';
import { Day } from 'src/app/model/common-models';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { faCircle, faMinus, faPepperHot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css'],
})
export class FoodItemComponent {
  @Input() menu?: Menu;
  @Input() displayOrderBy?: Boolean = false;
  @Input() displayDescription?: Boolean = false;
  @Input() orderBy?: Date = new Date();
  price: number = 0.0;
  specialInstruction: string | undefined;
  selectedchoice?: Extra;
  selectedExtras: Extra[] = [];
  quantity: number = 1;
  orderByDate: Date;

  faPlus = faPlus;
  faMinus = faMinus;
  faPepperHot = faPepperHot;
  faCircle = faCircle;

  constructor(
    private foodOrderService: FoodOrderService,
    private basketService: BasketService,
    private utils: Utils,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.price = this.menu.price;
    if ( this.orderBy){
      // this.orderByDate = this.orderBy.getTimezoneOffset
    }
  }

  addDays(theDate: Date, days: number): Date {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'custom-class',
      })
      .result.then(
        (result) => {},
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  close() {
    this.modalService.dismissAll();
  }

  handleChoiceSelection(e: any) {
    if (this.menu !== null && this.menu !== undefined) {
      this.menu.choices.forEach((choice) => {
        if (choice.name === e.target.value) {
          if (
            this.selectedchoice === null ||
            this.selectedchoice === undefined
          ) {
            this.selectedchoice = choice;
            this.price = this.price + this.selectedchoice.price * this.quantity;
            this.price = +(+this.price).toFixed(2);
          } else {
            // Remore Previously Added Choice
            this.price = this.price - this.selectedchoice.price * this.quantity;
            this.price = +(+this.price).toFixed(2);
            // Add New Choice
            this.selectedchoice = choice;
            this.price = this.price + this.selectedchoice.price * this.quantity;
            this.price = +(+this.price).toFixed(2);
          }
        }
      });
    }
  }

  selectExtra(extraClicked: string, e: any) {
    if (this.menu !== null && this.menu !== undefined) {
      this.menu.extras.forEach((item) => {
        if (item.name === extraClicked) {
          if (e.target.checked) {
            this.selectedExtras.push(item);
            this.price = this.price + item.price * this.quantity;
            this.price = +(+this.price).toFixed(2);
          } else {
            for (var i = 0; i < this.selectedExtras.length; i++) {
              var ex = this.selectedExtras[i];
              if (ex.name === extraClicked) {
                this.selectedExtras.splice(i, 1);
                this.price = this.price - ex.price * this.quantity;
                this.price = +(+this.price).toFixed(2);
              }
            }
          }
        }
      });
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
    if (this.menu !== null && this.menu !== undefined) {
      this.price = (this.menu.price + extraTotal) * this.quantity;
      this.price = +(+this.price).toFixed(2);
    }
  }

  addToOrder() {
    console.log('Add to Order: ');
    var foodOrderItem: FoodOrderItem = {
      _tempId: Date.now(),
      id: this.menu._id,
      image: this.menu.image,
      name: this.menu.name,
      quantity: this.quantity,
      price: this.menu.price,
      subTotal: this.price,
      extras: this.selectedExtras,
      choice: this.selectedchoice,
      specialInstruction: this.specialInstruction,
    };
    this.basketService.addToFoodOrder(foodOrderItem);
    this.close();
  }
}
