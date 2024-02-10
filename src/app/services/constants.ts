import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {

    StorageItem_C_Order: string =  "c_order";
    StorageItem_C_User: string =  "c_user";
    StorageItem_C_Chef: string = "c_chef";
    StorageItem_C_Reviews: string = "c_reviews";
    StorageItem_C_Preferences: string = "c_preferences";
}
