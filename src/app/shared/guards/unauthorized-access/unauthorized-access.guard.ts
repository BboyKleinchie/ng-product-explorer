import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth/auth';

/**
 * A route guard that prevents unauthorized access to the specific route
 * i.e. prevents users that aren't signed in to access the route
 */
export const unauthorizedAccessGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.authenticated$()) return true;

    router.navigate(['unauthorised']);
    return false;
};
