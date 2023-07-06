import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Furniture } from '../models/Furniture';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  private baseUrl = 'http://localhost:3000/furniture';

  constructor(private http: HttpClient) { }

  createFurniture(name: string, category: string, materials: string[]): Observable<Furniture> {
    return this.http.post<Furniture>(`${this.baseUrl}/create`, { name, category, materials });
  }

  listFurniture(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.baseUrl}/list`);
  }

  getFurnitureDetails(id: string): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.baseUrl}/${id}`);
  }
}
