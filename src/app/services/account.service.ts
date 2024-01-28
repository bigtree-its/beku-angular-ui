import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  retry,
  shareReplay,
  tap,
} from 'rxjs/operators';

import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { LocalService } from './local.service';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  PasswordResetInitiate,
  PasswordResetSubmit,
  RegisterRequest,
  User,
} from '../model/auth-model';
import { ServiceLocator } from './service.locator';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  public loginSession$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user: User;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private localService: LocalService,
    private serviceLocator: ServiceLocator,
    private readonly constants: Constants,
    private readonly router: Router
  ) {}

  isAuthenticated(): Observable<boolean> {
    console.log('Checking isAuthenticated');
    var s = this.jwtService.getIdToken();
    var found =
      s !== null && s !== undefined && this.jwtService.validateToken(s);
    if (found) {
      var user = this.buildUser(s);
      this.loginSession$.next(user);
    } else {
      console.error('User not authenticated.');
    }
    console.log('User found in storage : ' + found);
    return of(found);
  }

  getCurrentUser(): User {
    var s = this.jwtService.getIdToken();
    if (s !== null && s !== undefined) {
      return this.buildUser(s);
    }
    return null;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    let body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);
    body.set('grant_type', 'password');
    body.set('client_type', 'Customer');

    
    console.log('Submitting login credentials to server..');
    return this.http
      .post<LoginResponse>(this.serviceLocator.LoginUrl, body, {
        headers: { skip: 'true', 'Content-Type':'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((result) => {
          console.log('Login response ' + JSON.stringify(result));
          this.setUser(result);
        })
      );
  }

  register(
    registerReq: RegisterRequest
  ): Observable<{ loginResp: LoginResponse }> {
    return this.http
      .post<{ loginResp: LoginResponse }>(
        this.serviceLocator.RegisterUrl,
        registerReq,
        { headers: { skip: 'true' } }
      )
      .pipe(
        tap(({ loginResp }) => {
          this.setUser(loginResp);
        })
      );
  }

  private setUser(loginResp: LoginResponse) {
    this.jwtService.saveAccessToken(loginResp.accessToken);
    this.jwtService.saveIdToken(loginResp.idToken);
    var user: User = this.buildUser(loginResp.idToken);
    this.localService.saveData(this.constants.StorageItem_C_User, JSON.stringify(user));
    this.user = user;
    this.loginSession$.next(this.user);
  }

  private buildUser(token: string) {
    var tokenClaims = this.jwtService.getDecodedAccessToken(token);
    var user: User = {
      id: tokenClaims.clientId,
      firstName: tokenClaims.firstName,
      lastName: tokenClaims.lastName,
      name: tokenClaims.firstName + ' ' + tokenClaims.lastName,
      email: tokenClaims.email,
      mobile: tokenClaims.mobile,
    };
    return user;
  }

  public passwordResetInitiate(
    req: PasswordResetInitiate
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.serviceLocator.PasswordResetInitiateUrl,
      req,
      { headers: { skip: 'true' } }
    );
  }

  public passwordResetSubmit(
    req: PasswordResetSubmit
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.serviceLocator.PasswordResetSubmitUrl,
      req,
      { headers: { skip: 'true' } }
    );
  }

  public logout() {
    console.log('Logout...');
    // var token = this.jwtService.getIdToken();
    // var claims = this.jwtService.getDecodedAccessToken(token);
    this.purgeAuth();
    void this.router.navigate(['/']);
    // const req: LogoutRequest = {
    //   userId: claims.userId,
    // };
    // return this.http.post<void>(this.serviceLocator.LogoutUrl, req, {
    //   headers: { skip: 'true' },
    // });
  }

  purgeAuth(): void {
    console.log('Purging auth...');
    this.jwtService.destroyToken();
    this.loginSession$.next(null);
    this.localService.removeData(this.constants.StorageItem_C_User);
    this.localService.removeData(this.constants.StorageItem_C_Order);
    this.localService.removeData(this.constants.StorageItem_C_Chef);
  }

  getData() {
    var json = this.localService.getData(this.constants.StorageItem_C_User);
    if (json === undefined) {
      return undefined;
    }
    if (json !== '' && json !== null && json !== undefined) {
      var obj = JSON.parse(json);
      this.user = obj.constructor.name === 'Array' ? obj[0] : obj;
      this.loginSession$.next(this.user);
    }
  }
}
