import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Material } from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl = 'http://localhost:3000/material';

  private _material = new BehaviorSubject<Material[]>([]);
  public materials$ = this._material.asObservable();

  constructor(private http: HttpClient) { }

  listMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.baseUrl}/list`);
  }

  updateMaterials(): void {
    this.listMaterials().subscribe(materials => {
      this._material.next(materials);
    });
  }

  getMaterial(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
