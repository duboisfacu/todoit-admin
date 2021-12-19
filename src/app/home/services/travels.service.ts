import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from '../model/travel';
import { User } from 'src/app/login/model/user';

@Injectable({
  providedIn: 'root',
})
export class TravelsService {
  constructor(private http: HttpClient) {}

  get(status: number): Observable<Travel[]> {
    return this.http.get<Travel[]>(`/api/Travel/1/${status}`);
  }

  getDelivery(): Observable<User[]> {
    return this.http.get<User[]>(`/api/Users?userOperation=1`);
  }

  post(
    travelId: number,
    statusTravel: number,
    cadeteId: number,
    isReasigned: boolean,
    observations?: string
  ): Observable<Travel> {
    if (observations) {
      return this.http.post<Travel>(
        `/api/Travel?travelId=${travelId}&statusTravel=${statusTravel}&userOperation=1&cadeteId=${cadeteId}&isReasigned=${isReasigned}&observations=${observations}`,
        [travelId]
      );
    }
    return this.http.post<Travel>(
      `/api/Travel?travelId=${travelId}&statusTravel=${statusTravel}&userOperation=1&cadeteId=${cadeteId}&isReasigned=${isReasigned}`,
      [travelId]
    );
  }
}
