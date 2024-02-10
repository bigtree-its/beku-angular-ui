import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomerPreferences } from 'src/app/model/CustomerPreferences';
import { User } from 'src/app/model/auth-model';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy{


  destroy$ = new Subject<void>();

  accountService = inject(AccountService);
  utils = inject(Utils);
  toastService = inject(ToastService);
  user: User;

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;

  activeLayout: string = "Profile";
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  newPassword: string;
  error: boolean;
  message: string;
  customerPreferences: CustomerPreferences;
  communicationViaEmail: Boolean;
  communicationViaMobile: Boolean;
  cuisines: string[] = [];
  chefs: string[] = [];
  foods: string[] = [];

  ngOnInit(): void {
    this.accountService.getData();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        this.user = value;
        if ( this.user !== null && this.user !== undefined){
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
          this.email = this.user.email;
          this.mobile = this.user.mobile;
        }
      },
      error: (err) => console.error('CustomerObject emitted an error: ' + err),
      complete: () =>
        console.log('CustomerObject emitted the complete notification'),
    });

    this.accountService.getCustomerPreferences();
    this.accountService.customerPreferences$.subscribe({
      next: (value) => {
        this.customerPreferences = value;
        if ( this.customerPreferences !== null && this.customerPreferences !== undefined){
          this.communicationViaEmail = this.customerPreferences.communicationViaEmail;
          this.communicationViaMobile = this.customerPreferences.communicationViaMobile;
          this.cuisines = this.customerPreferences.cuisines;
          this.chefs = this.customerPreferences.chefs;
          this.foods = this.customerPreferences.foods;
        }
      },
      error: (err) => console.error('CustomerPreferences emitted an error: ' + err),
      complete: () =>
        console.log('CustomerPreferences emitted the complete notification'),
    });
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

  selectLayout(layout: string) {
    this.activeLayout = layout;
  }

  changePersonal() {
    if ( this.utils.isEmpty(this.password)){
      this.toastService.warning("Enter your current password");
      return;
    }
    if ( this.utils.isEmpty(this.firstName)){
      this.toastService.warning("Enter your first name");
      return;
    }
    if ( this.utils.isEmpty(this.lastName)){
      this.toastService.warning("Enter your last name");
      return;
    }
    if ( this.utils.isEmpty(this.email)){
      this.toastService.warning("Enter your email");
      return;
    }
    if ( this.utils.isEmpty(this.mobile)){
      this.toastService.warning("Enter your mobile");
      return;
    }
  }

  changePassword() {
    throw new Error('Method not implemented.');
  }


  changePreferences() {
    if (this.customerPreferences === null || this.customerPreferences === undefined){
      this.customerPreferences = {
        "customerId": this.user.id,
        "communicationViaEmail": this.communicationViaEmail,
        "communicationViaMobile": this.communicationViaMobile,
        "chefs": [],
        "cuisines": [],
        "foods": [],
      }
    }else{
      this.customerPreferences.communicationViaEmail = this.communicationViaEmail;
      this.customerPreferences.communicationViaMobile = this.communicationViaMobile;
    }
    let observable = this.accountService.updatePreferences(this.customerPreferences)
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log('Your preferences have been updated')
        this.toastService.info('Your preferences have been updated')
      },
      error: (err) => {
        this.toastService.info('Something went wrong. Please tray later.')
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
