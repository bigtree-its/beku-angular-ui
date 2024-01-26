import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Day } from 'src/app/model/common-models';
import {
  Calendar,
  Collection,
  CustomerOrder,
  Food,
  LocalChef,
  Menu,
} from 'src/app/model/localchef';
import { Review } from 'src/app/model/review';
import { ChefService } from 'src/app/services/chef.service';
import { ContextService } from 'src/app/services/context.service';
import { DataService } from 'src/app/services/data.service';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { ReviewService } from 'src/app/services/review.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-chefhome',
  templateUrl: './chefhome.component.html',
  styleUrls: ['./chefhome.component.css'],
})
export class ChefHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;

  chef: LocalChef | undefined;
  display_picture: any;
  gallery: string[] = [];

  calendars: Calendar[] = [];
  weeklyCals: Calendar[] = [];
  monthlyCals: Calendar[] = [];
  calendarsToDisplay: Calendar[];
  displayCal: boolean = true;
  displayAllDays: boolean = false;
  displayWeeklyCals: boolean = false;

  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  daysShort: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  monthNamesShort: string[] = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  items: Menu[] = [];
  items_to_display: Menu[] = [];
  validOrder: boolean = false;
  chefChanged: boolean = false;
  selectedCategory: Collection;
  starSelected: string = '/assets/icons/star2.png';
  star: string = '/assets/icons/star1.png';
  order: CustomerOrder;
  cartTotal: number = 0.0;
  weekDays: Day[];
  destroy$ = new Subject<void>();
  collections: Collection[];
  activeLayout: string = "Menu";
  supplierId: any;
  reviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: FoodOrderService,
    private chefService: ChefService,
    private reviewService: ReviewService,
    private _location: Location,
    private utils: Utils
  ) {}

  ngAfterViewInit(): void {
    console.log('AfterViewInit....');
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  ngOnInit(): void {
    if (this.weekDays == null || this.weekDays.length == 0) {
      this.weekDays = this.computeDays();
    }
    this.activatedRoute.params.subscribe((params) => {
      this.supplierId = params['id'];
      console.log('Chef-home for supplier '+ this.supplierId)
      let observable = this.chefService.getCollections(this.supplierId);
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.collections = data;
        },
        error: (err) => {
          console.error('Errors when getting collections for chef');
        },
      });

      let observable1 = this.chefService.getChef(this.supplierId);
      observable1.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.chef = data;
          this.fetchItems(this.chef._id);
          this.fetchCalendars(this.chef._id);
          this.fetchReviews(this.chef._id);
        },
        error: (err) => {
          console.error('Errors when getting chef from server. '+ JSON.stringify(err));
        },
      });
    });
    this.orderService.orderSubject$.subscribe((theOrder) => {
     
      if (this.utils.isValid(theOrder) && theOrder.status === 'Completed') {
        return;
      }
      this.order = theOrder;
      if (theOrder !== null && theOrder !== undefined) {
        if ( theOrder.supplier._id !== this.supplierId){
          console.info('Supplier: '+ this.supplierId)
          console.info('Supplier On Order: '+ theOrder.supplier._id)
          console.info('Chef changed. Destroying previous order')
          this.orderService.destroy();
        }else{
          this.cartTotal = theOrder.total;
        }
      }
    });
  }
  fetchReviews(supplierId: string) {
    this.reviewService.getReviews(supplierId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
      console.log('Reviews fetched: ' + this.reviews.length);
    });
  }

  selectLayout(layout: string){
    this.activeLayout = layout;
  }

  private fetchCalendars(supplierId: string) {
    this.chefService
      .getCalendars(supplierId, true, false)
      .subscribe((calendars: Calendar[]) => {
        this.calendars = calendars;
        this.groupCalendar();
        console.log('Calendars for chef: ' + this.calendars.length);
      });
  }

  selectThisWeek() {
    this.displayCal = true;
    this.displayAllDays = false;
    this.calendarsToDisplay = this.weeklyCals;
  }

  selectThisMonth() {
    this.displayCal = true;
    this.displayAllDays = false;
    this.calendarsToDisplay = this.monthlyCals;
  }

  addDays(theDate: Date, days: number): Date {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  groupCalendar() {
    console.log('Grouping cal');
    this.weeklyCals = [];
    this.monthlyCals = [];
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    let today: Date = new Date();
    let dayOfWeekNumber: number = today.getDay();
    let endDays: number = 7 - dayOfWeekNumber;
    var endDate: Date = this.addDays(today, endDays);
    for (var i = 0; i < this.calendars.length; i++) {
      var calendar: Calendar = this.calendars[i];
      if (calendar !== null && calendar !== undefined) {
        let calDate: Date = new Date(calendar.orderBefore);
        console.log('Cal Date ' + calDate);
        if (calDate < endDate && calDate > today) {
          this.weeklyCals.push(calendar);
          this.monthlyCals.push(calendar);
        } else if (calDate < lastDay && calDate > firstDay) {
          this.monthlyCals.push(calendar);
        }
      }
    }
    console.log('Weekly Cals: ' + JSON.stringify(this.weeklyCals));
    console.log('Monthly Cals: ' + JSON.stringify(this.monthlyCals));
  }

  private fetchItems(supplierId: string) {
    this.chefService.getMenusForChef(supplierId).subscribe((items: Menu[]) => {
      this.items = items;
      console.log('Menus fetched: ' + this.items.length);
      if ( this.collections !== null && this.collections !== undefined && this.collections.length > 0){
        this.onSelectCategory(this.collections[0]);
      }
    });
  }

  getAddress(): string {
    var address: string = '';
    if (this.chef !== null && this.chef !== undefined) {
      return this.utils.getChefAddress(this.chef);
    }
    return address;
  }

  computeDays() {
    var weekDays: Day[] = [];
    var theDate = new Date(),
      year = theDate.getFullYear(),
      month = theDate.getMonth();
    for (let i = 0; i < 7; i++) {
      theDate = this.addDays(theDate, i === 0 ? 0 : 1);
      weekDays.push(this.utils.getDay(theDate));
    }
    return weekDays;
  }

  selectedDate(date: Day) {
    // this.selectedDate = date;
  }

  filterItemsByCat(category: Collection) {
    this.selectedCategory = category;
    this.items_to_display = [];
    this.items
      .filter((i) => i.collectionId === category._id)
      .forEach((item) => this.items_to_display.push(item));
  }

  isSelectedCategory(category: Collection) {
    if (this.selectedCategory === category) {
      return true;
    }
    return false;
  }

  goback() {
    this._location.back();
  }

  onSelectCategory(category: Collection) {
    this.filterItemsByCat(category);
    this.selectedCategory = category;
    this.displayCal = false;
    this.displayAllDays = true;
    // // event.target.style = "border-right: 3px solid #766df4;color: #766df4;text-align: right;";
    // this.categoriesMap.set(category, event.target);
    // this.categoriesMap.forEach((key: string, value: any) => {
    //   if (key !== category) {
    //     value.style = "font-weight: 900;border-right: 3px solid #fff;display: block; margin-bottom: 2px;padding-right: 10px;text-align: right;";
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
