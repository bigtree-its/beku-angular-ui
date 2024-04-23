import { Component, Input } from '@angular/core';
import { Extra, Food, FoodOrderItem, Menu } from 'src/app/model/localchef';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faCheck,
  faCircle,
  faCircleCheck,
  faMinus,
  faPepperHot,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/services/basket.service';
import { PartyBundle } from 'src/app/model/foods/all-foods';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css'],
})
export class FoodItemComponent {
  @Input() menu?: Menu;
  @Input() displayOrderBy?: Boolean = false;
  @Input() displayDescription?: Boolean = false;
  @Input() orderBy?: Date;
  @Input() readyBy?: Date;
  @Input() pb?: PartyBundle;

  price: number = 0.0;
  specialInstruction: string | undefined;
  selectedchoice?: Extra;
  selectedExtras: Extra[] = [];
  quantity: number = 1;
  orderByDate: Date;

  faCheck = faCheck;
  faPlus = faPlus;
  faMinus = faMinus;
  faPepperHot = faPepperHot;
  faCircle = faCircle;
  selectedStarters: Food[] = [];
  selectedMains: Food[] = [];
  selectedDeserts: Food[] = [];
  selectedSides: Food[] = [];

  constructor(
    private basketService: BasketService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.menu) {
      this.price = this.menu.price;
    } else if (this.pb) {
      this.price = this.pb.price;
    }

    if (this.readyBy) {
      var date = new Date(this.readyBy);
      this.orderBy = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
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

  selectStarter(_t92: Food, e: any) {
    if (this.selectedStarters.length === 2){
      return;
    }
    if (this.pb !== null && this.pb !== undefined) {
      this.pb.starters.forEach((item) => {
        if (item.name === _t92.name) {
          if (e.target.checked) {
            this.selectedStarters.push(item);
          } else {
            for (var i = 0; i < this.selectedStarters.length; i++) {
              var st = this.selectedStarters[i];
              if (st.name === _t92.name) {
                this.selectedStarters.splice(i, 1);
              }
            }
          }
        }
      });
    }
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
