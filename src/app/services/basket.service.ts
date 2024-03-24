import { Injectable, inject } from "@angular/core";
import { OrderItem, Product } from "../model/products/all";
import { FoodOrderItem } from "../model/localchef";
import { LocalService } from "./local.service";
import { Constants } from "./constants";
import { Utils } from "../helpers/utils";
import { OrderService } from "./products/order.service";
import { FoodOrderService } from "./food-order.service";
import { ToastService } from "./toast.service";
import { ConfirmationDialogService } from "../shared/confirmation-dialog/confirmation.dialog.service";

@Injectable({
    providedIn: 'root',
})
export class BasketService {

    pOrderService = inject(OrderService);
    fOrderService = inject(FoodOrderService);
    localService = inject(LocalService);
    toastService = inject(ToastService);
    confirmationDialogService = inject(ConfirmationDialogService);

    addToProductOrder(OrderItem: OrderItem) {
        console.log('Adding a product to cart');
        var json = this.localService.getData(Constants.StorageItem_F_Order);
        if (Utils.isValid(json) && Utils.isJsonString(json)) {
            if (window.confirm("There is a Food Order. Are you sure to delete that and create Product Order ?")){
                this.fOrderService.destroy();
                this.pOrderService.addToOrder(OrderItem);
            }
        } else {
            this.pOrderService.addToOrder(OrderItem);
        }
    }

    addToFoodOrder(foodItem: FoodOrderItem) {
        console.log('Adding a food to cart');
        var json = this.localService.getData(Constants.StorageItem_P_Order);
        if (Utils.isValid(json) && Utils.isJsonString(json)) {
            if (window.confirm("There is a Product Order.You sure to delete that and create Food Order ?")){
                this.pOrderService.destroy();
                this.fOrderService.addToOrder(foodItem);
            }
        } else {
            this.fOrderService.addToOrder(foodItem);
        }
    }
}