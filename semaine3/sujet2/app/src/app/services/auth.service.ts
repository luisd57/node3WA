import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, user, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isAuthenticated`, { headers: this.headers, withCredentials: true });
  }

}
