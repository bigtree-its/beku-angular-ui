import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Errors, PasswordResetSubmit } from 'src/app/model/auth-model';
import { AccountService } from 'src/app/services/account.service';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-reset-submit',
  templateUrl: './reset-submit.component.html',
  styleUrls: ['./reset-submit.component.css']
})
export class ResetSubmitComponent implements OnInit, OnDestroy {


  email: string = '';
  oneTimePasscode: string = '';
  password: string = '';
  repeatPassword: string = '';
  error: string;
  destroy$ = new Subject<void>();
  errors: Errors = { errors: {} };

  secret: string = "";
  inputText: string = "";
  encryptedText: string = "";
  decryptedText: string = "";
  errorMessage: any;

  constructor(private accountSvc: AccountService,
    private activatedRoute: ActivatedRoute,
    private cryptoService: CryptoService,
    private router: Router,
    private utils: Utils) { }

  ngOnInit(): void {
    const qs = this.activatedRoute.snapshot.queryParamMap.get('qs');
    if ( this.utils.isEmpty(qs)){
      this.errorMessage = "Something went wrong. Retry again."
    }else{
      var decryptedQS = this.cryptoService.decrypt(qs);
      var params = decryptedQS.split("&");
      this.oneTimePasscode = params[0].split("=")[1];
      this.email = params[1].split("=")[1];
      if ( this.utils.isEmpty(this.oneTimePasscode)){
        this.errorMessage = "Something went wrong. Retry again."
      }else  if ( this.utils.isEmpty(this.email)){
        this.errorMessage = "Something went wrong. Retry again."
      }
     
    }

  }
  submit() {

    this.errorMessage = undefined;
    if (this.utils.isEmpty(this.email)) {
      this.error = 'Email is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.oneTimePasscode)) {
      this.error = 'OTP is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.password)) {
      this.error = 'Password is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.repeatPassword)) {
      this.error = 'Confirm Password is mandatory';
      return;
    }
    if (!this.utils.isEquals(this.password, this.repeatPassword)) {
      this.error = 'Password and Repeat Password are not matching';
      return;
    }
    let otpEncrypted = this.cryptoService.encrypt(this.oneTimePasscode);
    let emailEncrypted = this.cryptoService.encrypt(this.email);
    let passwordEncrypted = this.cryptoService.encrypt(this.password);
    console.log('otpEncrypted: '+ otpEncrypted)
    console.log('emailEncrypted: '+ emailEncrypted)
    console.log('passwordEncrypted: '+ passwordEncrypted)
    var req: PasswordResetSubmit = {
      otp: this.oneTimePasscode,
      email: this.email,
      password: this.password
    }
    console.log('Resting password: '+ JSON.stringify(req))
    let observable = this.accountSvc.passwordResetSubmit(req)
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log('Reset password has been submitted.')
        void this.router.navigate(["/login"])
      },
      error: (err) => {
        console.error('Errors from reset submit.'+ JSON.stringify(err))
        this.errors = err;
        this.errorMessage = err.error.detail;
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
}
