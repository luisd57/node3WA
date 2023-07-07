import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Furniture } from '../models/Furniture';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  private baseUrl = 'http://localhost:3000/furniture';

  private _furniture = new BehaviorSubject<Furniture[]>([]);

  readonly furniture$ = this._furniture.asObservable();

  constructor(private http: HttpClient) { }

  createFurniture(name: string, category: string, materials: string[]): Observable<Furniture> {
    return this.http.post<Furniture>(`${this.baseUrl}/create`, { name, category, materials });
  }

  listFurniture(): void {
    this.updateFurnitureList();
  }

  getFurnitureDetails(id: string): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.baseUrl}/${id}`);
  }

  updateFurnitureList() {
    this.http.get<Furniture[]>(`${this.baseUrl}/list`).subscribe(
      furnitureList => {
        this._furniture.next(furnitureList);
      }
    );
  }


}
