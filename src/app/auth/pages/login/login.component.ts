import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/helpers/utils';
import { AccountService } from 'src/app/services/account.service';
import { ContextService } from 'src/app/services/context.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Errors } from 'src/app/model/auth-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  loading: boolean = false;
  successful: boolean = false;
  password: string = '';
  error: string;
  email: string;
  returnUrl: string;
  destroy$ = new Subject<void>();
  errors: Errors = { errors: {} };
  errorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils,
    private accountService: AccountService,
    
    private ctxSvc: ContextService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.submitted = false;
    this.successful = false;
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
   
  }

  submit() {
    // stop here if form is invalid
    if (this.utils.isEmpty(this.email)) {
      this.error = 'Email is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.password)) {
      this.error = 'Password is mandatory';
      return;
    }
    this.submitted = true;
    // reset alerts on submit
    this.loading = true;
    console.log('Submitting login..')
    let observable = this.accountService.login(this.email, this.password);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.errorMessage = undefined;
        console.log('Login success. Redirecting to home...')
        void this.router.navigate(["/"])
      },
      error: (err) => {
        console.error('Errors from reset submit.'+ JSON.stringify(err))
        this.errors = err;
        this.loading = false;
        this.errorMessage = err.error.detail;
      },
    });

  }

  forgotPassword() {
   
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  joinUs() {
    this.router.navigate(['/register']);
  }
}
