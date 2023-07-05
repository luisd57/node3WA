import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  private currentUser!: User;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  logout(): Observable<any> {
    sessionStorage.removeItem('currentUser');
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  setUser(user: User): void {
    this.currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): User {
    if (!this.currentUser) {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

}
