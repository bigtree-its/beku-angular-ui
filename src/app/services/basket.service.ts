import { Injectable, inject } from "@angular/core";
import { OrderItem, Product } from "../model/products/all";
import { FoodOrderItem } from "../model/localchef";
import { LocalService } from "./local.service";
import { Constants } from "./constants";
import { Utils } from "../helpers/utils";
import { OrderService } from "./products/order.service";
import { FoodOrderService } from "./food-order.service";
import { ToastService } from "./toast.service";

@Injectable({
    providedIn: 'root',
})
export class BasketService {

    pOrderService = inject(OrderService);
    fOrderService = inject(FoodOrderService);
    localService = inject(LocalService);
    toastService = inject(ToastService);
    utils = inject(Utils);

    addToProductOrder(OrderItem: OrderItem){
        console.log('Adding a product to cart');
        var json = this.localService.getData(Constants.StorageItem_F_Order);
        if ( Utils.isValid(json) && Utils.isJsonString(json)){
            this.toastService.warning("You have a active food cart. Please be informed that food cart will be removed.");
            this.fOrderService.destroy();
            this.pOrderService.addToOrder(OrderItem);
        }else{
            this.pOrderService.addToOrder(OrderItem);
        }
    }

    addToFoodOrder(foodItem: FoodOrderItem){
        console.log('Adding a food to cart');
        var json = this.localService.getData(Constants.StorageItem_P_Order);
        if ( Utils.isValid(json) && Utils.isJsonString(json)){
            this.toastService.warning("You have a active product cart. Please be informed that product cart will be removed.");
            this.pOrderService.destroy();
            this.fOrderService.addToOrder(foodItem);
        }else{
            this.fOrderService.addToOrder(foodItem);
        }
    }
}