import { Injectable } from '@angular/core';
import { Day } from '../model/common-models';
import { LocalChef } from '../model/localchef';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor() {}

  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysShort: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthNamesShort: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  getDay(theDate: Date): Day{
    if (theDate === null || theDate === undefined){
      theDate = new Date();
    }
    var month = theDate.getMonth()
    var weekDay = theDate.getDay();
    var date = theDate.getDate();
    var dayNameShort = this.daysShort[weekDay];
    var monthNameShort = this.monthNamesShort[month];
    const d: Day = {
      date: date,
      day: dayNameShort,
      month: monthNameShort
    }
    return d;
  }

  public isCollectionEmpty(data: any[]): Boolean {
    if ( data === null || data === undefined || data.length === 0){
        return true;
    }
    return false;
  }

  isStringValid(str: string): boolean{
    if ( str === null || str === undefined || str.length === 0){
      return false;
  }
  return true;
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

  public isEquals(data1: string, data2: string): Boolean {
    if ( data1 === data2 ){
        return true;
    }
    return false;
  }

  getChefAddress(chef: LocalChef){
    var address: string = ""

    if ( chef === null || chef === undefined){
      return address;
    }
    if (chef.address.addressLine1 !== undefined) {
      if (address.length > 0) {
        address = address + ", ";
      }
      address = address + chef.address.addressLine1;
    }
    if (chef.address.addressLine2 !== undefined) {
      if (address.length > 0) {
        address = address + ", ";
      }
      address = address + chef.address.addressLine2;
    }
    if (chef.address.city !== undefined) {
      if (address.length > 0) {
        address = address + ", ";
      }
      address = address + chef.address.city;
    }
    if (chef.address.postcode !== undefined) {
      if (address.length > 0) {
        address = address + ", ";
      }
      address = address + chef.address.postcode;
    }
    return address;
  }
}