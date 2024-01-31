import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { User } from 'src/app/model/auth-model';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{


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
    throw new Error('Method not implemented.');
  }

}
