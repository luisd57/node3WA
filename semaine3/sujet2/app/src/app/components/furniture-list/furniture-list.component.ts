import { Component, OnInit } from '@angular/core';
import { Furniture } from 'src/app/models/Furniture';
import { FurnitureService } from 'src/app/services/furniture.service';

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css']
})
export class FurnitureListComponent implements OnInit {

  furnitureList: Furniture[] = [];
  filteredFurnitureList: Furniture[] = [];
  currentCategory: string = '';

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit(): void {
    this.furnitureService.listFurniture();
    this.furnitureService.furniture$.subscribe(furnitureList => {
      this.furnitureList = furnitureList;
      this.filteredFurnitureList = furnitureList;
    });
  }

  filterByCategory(category: string = ''): void {
    this.currentCategory = category;
    if (category) {
      this.filteredFurnitureList = this.furnitureList.filter(item => item.category === category);
    } else {
      this.filteredFurnitureList = this.furnitureList;
    }
  }

}
