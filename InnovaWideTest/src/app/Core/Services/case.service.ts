import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseDto } from '../Models/case.model';
import { ENDPOINT } from '../Models/end-points';



@Injectable({
  providedIn: 'root',
})
export class CaseService {
  constructor(private http: HttpClient) {}

  getCases(): Observable<CaseDto[]> {
    return this.http.get<CaseDto[]>(`${ENDPOINT.MAIN_HOST}${ENDPOINT.Case.GET_ALL_Case}`);
  }

  getCase(id: number): Observable<CaseDto> {
    return this.http.get<CaseDto>(`${ENDPOINT.MAIN_HOST}${ENDPOINT.Case.GET_Case_BY_ID}${id}`);
  }

  createCase(caseDto: CaseDto): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${ENDPOINT.MAIN_HOST}${ENDPOINT.Case.ADD_Case}`, caseDto, { observe: 'response' });
  }

  updateCase(id: number, caseDto: CaseDto): Observable<HttpResponse<any>> {
  return this.http.put<HttpResponse<any>>(`${ENDPOINT.MAIN_HOST}${ENDPOINT.Case.UPDATE_Case}${id}`, caseDto, { observe: 'response' });
  }

  deleteCase(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${ENDPOINT.MAIN_HOST}${ENDPOINT.Case.DELETE_Case}${id}`, { observe: 'response' });
  }
}
