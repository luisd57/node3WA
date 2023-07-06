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

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit(): void {
    this.furnitureService.listFurniture().subscribe({
      next: (furnitureList: Furniture[]) => {
        this.furnitureList = furnitureList;
      },
      error: (error) => {
        console.error('Error fetching furniture list');
        alert('Error fetching furniture list. Please try again.');
      }
    });
  }


}
