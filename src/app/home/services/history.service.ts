import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from '../model/travel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }

  get(status: number): Observable <Travel[]> {
    return this.http.get < Travel []> (`/api/Travel/1/${status}`)
  }
}
