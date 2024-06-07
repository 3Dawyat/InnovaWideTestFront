import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  if (!cookieService.get('token')) {
    return router.navigate(['/login']);
  }
  return true;
};
