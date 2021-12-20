import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Travel } from '../model/travel';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getTravel(status: number): Observable<Travel[]> {
    return this.http.get<Travel[]>(`/api/Travel/1/${status}`);
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`/api/Users?userOperation=1`);
  }
}
