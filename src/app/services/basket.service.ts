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
    utils = inject(Utils);

    addToProductOrder(OrderItem: OrderItem) {
        console.log('Adding a product to cart');
        var json = this.localService.getData(Constants.StorageItem_F_Order);
        if (Utils.isValid(json) && Utils.isJsonString(json)) {
            this.confirmationDialogService.confirm('Please confirm', 'You have a active food cart. Adding this product to the cart will remove food order. Please confirm ?')
                .then((confirmed) => {
                    console.log('User confirmed:', confirmed);
                    this.fOrderService.destroy();
                    this.pOrderService.addToOrder(OrderItem);
                })
                .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        } else {
            this.pOrderService.addToOrder(OrderItem);
        }
    }

    addToFoodOrder(foodItem: FoodOrderItem) {
        console.log('Adding a food to cart');
        var json = this.localService.getData(Constants.StorageItem_P_Order);
        if (Utils.isValid(json) && Utils.isJsonString(json)) {
            this.confirmationDialogService.confirm('Please confirm', 'You have a active Product cart. Adding this food to the cart will remove Prouct order. Please confirm ?')
                .then((confirmed) => {
                    console.log('User confirmed:', confirmed);
                    this.pOrderService.destroy();
                    this.fOrderService.addToOrder(foodItem);
                })
                .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        } else {
            this.fOrderService.addToOrder(foodItem);
        }
    }
}