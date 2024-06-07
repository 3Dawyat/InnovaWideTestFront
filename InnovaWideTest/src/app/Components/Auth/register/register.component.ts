import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from '../../../Core/Models/auth.model';
import { AuthService } from '../../../Core/Services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.required]),
    tenent: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    userName: new FormControl(null, [
      Validators.minLength(3),
      Validators.pattern(/^[A-Z]/),
      Validators.required,
    ]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(data: FormGroup) {
    var registerDto: RegisterDto = {
      Email: data.value.email,
      Name: data.value.name,
      Tenent: data.value.tenent,
      Password: data.value.password,
      ConfirmPassword: data.value.confirmPassword,
    };

    this.authService.Regester(registerDto).subscribe(
      (response) => {
        console.log(response);
        if (response.body.isAuthenticated) {
          this.toastr.success(response.body.massage, 'Success');
          this.router.navigate(['/']);
        } else {
          this.toastr.error(response.body.massage, 'Error');
        }
      },
      (error) => {
        this.toastr.error('Registration failed', 'Error');
      }
    );
  }
}
