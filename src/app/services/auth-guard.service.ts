import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn, ActivatedRoute, mapToCanActivate
} from '@angular/router';
import {catchError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from './account.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(AccountService);
  const router = inject(Router);

  console.log('Route '+ route.url);
  console.log('State.Url '+ state.url);

  return loginService.isAuthenticated().pipe(
    map(loggedIn => loggedIn ? true : router.createUrlTree([router.parseUrl("/login")], {
      queryParams: { loggedOut: true, origUrl: state.url }
    } )),
    catchError((err) => {
      router.navigate(["/login"], {
        queryParams: { loggedOut: true, origUrl: state.url }
      });
      return of(false);
    })
  )
}