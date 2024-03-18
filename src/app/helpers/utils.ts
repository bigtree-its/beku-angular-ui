import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor() {}

  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public isCollectionEmpty(data: any[]): Boolean {
    if ( data === null || data === undefined || data.length === 0){
        return true;
    }
    return false;
  }

  public isEmpty(data: string): Boolean {
    if ( data === null || data === undefined || data.length === 0){
        return true;
    }
    return false;
  }

  public isValid(data: any): Boolean {
    if ( data === null || data === undefined ){
        return false;
    }
    return true;
  }

  public static isValid(data: any): Boolean {
    if ( data === null || data === undefined ){
        return false;
    }
    return true;
  }

  public isEquals(data1: string, data2: string): Boolean {
    console.log('Comparing '+ data1+" and "+ data2)
    return data1 === data2;
  }
}