import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuth: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private renderer: Renderer2
  ) {
    if (this.cookieService.get('token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  ngOnInit() {
    const theme = this.cookieService.get('theme');
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'theme-dark');
    }
  }

  LogOut() {
    console.log('log out');
    this.cookieService.delete('token');
    this.cookieService.delete('tenent');
    this.isAuth = false;
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    const body = document.body;
    if (body.classList.contains('theme-dark')) {
      this.renderer.removeClass(body, 'theme-dark');
      this.cookieService.set('theme', 'light');
    } else {
      this.renderer.addClass(body, 'theme-dark');
      this.cookieService.set('theme', 'dark');
    }
  }
}
