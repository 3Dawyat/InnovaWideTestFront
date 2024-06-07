import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT } from '../Models/end-points';
import { LoginDto, RegisterDto } from '../Models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Login(Dto: LoginDto): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Auth.Login}`,
      Dto,
      { observe: 'response' }
    );
  }
  Regester(Dto: RegisterDto): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Auth.Regester}`,
      Dto,
      { observe: 'response' }
    );
  }
}
