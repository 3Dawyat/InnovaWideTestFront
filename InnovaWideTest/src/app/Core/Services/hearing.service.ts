import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HearingDto, HearingListDto } from '../Models/hearing.model';
import { ENDPOINT } from '../Models/end-points';

@Injectable({
  providedIn: 'root',
})
export class HearingService {
  constructor(private http: HttpClient) {}

  getHearings(): Observable<HearingListDto[]> {
    return this.http.get<HearingListDto[]>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Hearing.GET_ALL_Hearing}`
    );
  }

  getHearing(id: number): Observable<HearingListDto> {
    return this.http.get<HearingListDto>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Hearing.GET_Hearing_BY_ID}${id}`
    );
  }

  createHearing(hearingDto: HearingDto): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Hearing.ADD_Hearing}`,
      hearingDto,
      { observe: 'response' }
    );
  }

  updateHearing(
    id: number,
    hearingDto: HearingDto
  ): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Hearing.UPDATE_Hearing}${id}`,
      hearingDto,
      { observe: 'response' }
    );
  }

  deleteHearing(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Hearing.DELETE_Hearing}${id}`,
      { observe: 'response' }
    );
  }
}
