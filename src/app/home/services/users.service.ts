import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from 'src/app/home/model/userList';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  get(): Observable<UserList[]> {
    return this.http.get<UserList[]>(`/api/Users?userOperation=1`);
  }

  post(user: UserList): Observable<UserList> {
    return this.http.post<UserList>('/api/Users', user);
  }
}
