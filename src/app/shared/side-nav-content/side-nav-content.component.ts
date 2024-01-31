import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/auth-model';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  accountService = inject(AccountService);
  user: User;
  
  navItems = [
    { label: 'Login', route: '/apps'},
    { label: 'Logout', route: '/'},
    { label: 'Become a partner', route: '/become-a-partner'},
    { label: 'Orders', route: '/orders'},
    { label: 'Profile', route: '/profile'}
  ];
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.accountService.getData();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        this.user = value;
      },
      error: (err) => console.error('CustomerObject emitted an error: ' + err),
      complete: () =>
        console.log('CustomerObject emitted the complete notification'),
    });
  }

  onNavigationSelection(navItem: any) {
    this.router.navigate([navItem.route]);
  }

  logout(){
    this.accountService.logout();
  }
}