import { Component, OnInit } from '@angular/core';
import { Furniture } from 'src/app/models/Furniture';
import { Material } from 'src/app/models/Material';
import { FurnitureService } from 'src/app/services/furniture.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {

  name: string = "";
  category: string = "";
  materials: {[id: string]: boolean} = {};
  materialList: Material[] = [];
  categoryOptions: string[] = ['wardrobe', 'shelf'];

  constructor(private furnitureService: FurnitureService, private materialService: MaterialService) { }

  ngOnInit(): void {
    this.materialService.listMaterials().subscribe((materials: Material[]) => {
      this.materialList = materials;
    });
  }

  // onSubmit(): void {
  //   if (!this.name || !this.category || this.materials.length === 0) {
  //     alert('All fields are required');
  //     return;
  //   }

  //   this.furnitureService.createFurniture(this.name, this.category, this.materials).subscribe({
  //     next: () => {
  //       alert(`Furniture "${this.name}" created successfully.`);
  //       this.furnitureService.updateFurnitureList();
  //     },
  //     error: (error) => {
  //       console.error('Creation of furniture failed.');
  //       alert('Creation of furniture failed. Please try again.');
  //     }
  //   });
  // }

  onSubmit(): void {
    if (!this.name || !this.category || Object.keys(this.materials).length === 0) {
      alert('All fields are required');
      return;
    }

    const selectedMaterials = Object.keys(this.materials).filter(id => this.materials[id]);
    
    this.furnitureService.createFurniture(this.name, this.category, selectedMaterials).subscribe({
      next: () => {
        alert(`Furniture "${this.name}" created successfully.`);
        this.furnitureService.updateFurnitureList();
      },
      error: (error) => {
        console.error('Creation of furniture failed.');
        alert('Creation of furniture failed. Please try again.');
      }
    });
  }


}