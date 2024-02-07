import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Errors } from 'src/app/model/auth-model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.css']
})
export class BecomeAPartnerComponent implements OnInit, OnDestroy{

  submitted: boolean = false;
  loading: boolean = false;
  successful: boolean = false;
  fullName: string = '';
  error: string;
  email: string;
  mobile: string;
  message: string;
  returnUrl: string;
  destroy$ = new Subject<void>();
  errors: Errors = { errors: {} };
  errorMessage: any;

  private utils = inject(Utils);
  private accountService = inject(AccountService)

  ngOnInit(): void {
    this.loading = false;
    this.submitted = false;
    this.successful = false;
  }

  submit() {
    // stop here if form is invalid
    if (this.utils.isEmpty(this.email)) {
      this.error = 'Email is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.fullName)) {
      this.error = 'Fullname is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.mobile)) {
      this.error = 'Mobile is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.message)) {
      this.error = 'Message is mandatory';
      return;
    }
    this.submitted = true;
    // reset alerts on submit
    this.loading = true;
    console.log('Submitting login..')
    let observable = this.accountService.customerLogin(this.email, this.fullName);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.errorMessage = undefined;
      },
      error: (err) => {
        console.error('Errors from reset submit.'+ JSON.stringify(err))
        this.errors = err;
        this.loading = false;
        this.errorMessage = err.error.detail;
      },
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
