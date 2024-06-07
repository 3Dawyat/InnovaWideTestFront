import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';
import { LoginDto } from '../../../Core/Models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private http: HttpClient,

    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}
  onSubmit(data: FormGroup) {
    var loginDto: LoginDto = {
      Email: data.value.email,
      Password: data.value.password,
    };

    this.authService.Login(loginDto).subscribe(
      (response) => {
        if (response.body.isAuthenticated) {
          this.toastr.success(response.body.massage, 'Success');
          this.cookieService.set('tenent', response.body.tenent);
          this.cookieService.set('token', response.body.token);
          this.router.navigate(['/']);
        } else {
          this.toastr.error(response.body.massage, 'Error');
        }
      },
      (error) => {
        this.toastr.error('Login failed', 'Error');
      }
    );
  }
}
