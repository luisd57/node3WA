import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from '../models/Passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  private baseUrl = 'http://localhost:3000/passengers';

  constructor(private http: HttpClient) { }

  getAlivePassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.baseUrl}/alivePassengers`);
  }

  getAliveMen(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.baseUrl}/aliveMen`);
  }

  getAliveWomen(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.baseUrl}/aliveWomen`);
  }

  getAllPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.baseUrl);
  }
}
