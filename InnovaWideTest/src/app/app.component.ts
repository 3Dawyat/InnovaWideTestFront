import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuth: boolean = false;
  constructor(private cookieService: CookieService, private router: Router) {
    if (this.cookieService.get('token'))
      this.isAuth = true;
    else 
    this.isAuth = false;
  }

  LogOut() {
    console.log('log out');
    this.cookieService.delete('token');
    this.cookieService.delete('tenent');
    this.isAuth = false;
    this.router.navigate(['/login']);
  }
}
