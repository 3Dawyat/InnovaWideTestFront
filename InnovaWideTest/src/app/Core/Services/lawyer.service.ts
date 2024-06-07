import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LawyerDto } from '../Models/lawyer.model';
import { ENDPOINT } from '../Models/end-points';

@Injectable({
  providedIn: 'root',
})
export class LawyerService {
  constructor(private http: HttpClient) {}

  getLawyers(): Observable<LawyerDto[]> {
    return this.http.get<LawyerDto[]>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Lawyer.GET_ALL_Lawyer}`
    );
  }

  getLawyer(id: number): Observable<LawyerDto> {
    return this.http.get<LawyerDto>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Lawyer.GET_Lawyer_BY_ID}${id}`
    );
  }

  createLawyer(LawyerDto: LawyerDto): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Lawyer.ADD_Lawyer}`,
      LawyerDto,
      { observe: 'response' }
    );
  }

  updateLawyer(
    id: number,
    LawyerDto: LawyerDto
  ): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Lawyer.UPDATE_Lawyer}${id}`,
      LawyerDto,
      { observe: 'response' }
    );
  }

  deleteLawyer(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Lawyer.DELETE_Lawyer}${id}`,
      { observe: 'response' }
    );
  }
}
