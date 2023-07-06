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
  filteredList: Furniture[] = [];
  currentCategory: string = '';

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit(): void {
    this.furnitureService.listFurniture().subscribe({
      next: (furnitureList: Furniture[]) => {
        this.furnitureList = furnitureList;
        this.filteredList = furnitureList;
      },
      error: (error) => {
        console.error('Error fetching furniture list');
        alert('Error fetching furniture list. Please try again.');
      }
    });
  }
  filterByCategory(category: string = ''): void {
    this.currentCategory = category;
    if (category) {
        this.filteredList = this.furnitureList.filter(item => item.category === category);
    } else {
        this.filteredList = this.furnitureList;
    }
}

}
