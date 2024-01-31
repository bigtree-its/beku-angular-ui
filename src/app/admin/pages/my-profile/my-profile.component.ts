import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;

  activeLayout: string = "Profile";
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  newPassword: string;

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
    
  }

  changePassword() {
    throw new Error('Method not implemented.');
  }
  changePreferences() {
    throw new Error('Method not implemented.');
  }

}
