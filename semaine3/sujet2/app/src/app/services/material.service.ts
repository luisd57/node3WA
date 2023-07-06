import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl = 'http://localhost:3000/material';

  constructor(private http: HttpClient) { }

  listMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.baseUrl}/list`);
  }

  getMaterial(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
