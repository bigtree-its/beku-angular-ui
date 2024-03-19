import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor() {}

  static isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static isCollectionEmpty(data: any[]): Boolean {
    if ( data === null || data === undefined || data.length === 0){
        return true;
    }
    return false;
  }

  public  static isEmpty(data: string): Boolean {
    if ( data === null || data === undefined || data.length === 0){
        return true;
    }
    return false;
  }

  public static isValid(data: any): Boolean {
    if ( data === null || data === undefined ){
        return false;
    }
    return true;
  }

  public static isEquals(data1: string, data2: string): Boolean {
    console.log('Comparing '+ data1+" and "+ data2)
    return data1 === data2;
  }
}