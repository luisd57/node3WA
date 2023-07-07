import { Component } from '@angular/core';
import { ChartOptions, ChartDataset  } from 'chart.js';
import { Subject, takeUntil, map } from 'rxjs';
import { Material } from 'src/app/models/Material';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-chart',
  templateUrl: './material-chart.component.html',
  styleUrls: ['./material-chart.component.css']
})
export class MaterialChartComponent {

  public barChartData: ChartDataset[] = [{ data: [], label: 'Stock Quantity', backgroundColor: [] }];
  public barChartLabels: string[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLegend = true;

  private colorCodes: { [key: string]: string } = {
    'ash': '#B2BEB5',
    'oak': '#806517',
    'walnut': '#6F4E37',
    'stainless steel': '#C0C0C0',
    'aluminum': '#848484',
    'plastic': '#B8B8B8'
  };

  private destroy$ = new Subject<void>();

  constructor(private materialService: MaterialService) {
    this.filterByMaterial();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterByMaterial() {
    this.materialService.listMaterials().pipe(
      takeUntil(this.destroy$),
      map((materials: Material[]) => {
        const materialData: number[] = [];
        const materialLabels: string[] = [];
        const materialColors: string[] = [];

        materials.forEach(material => {
          materialLabels.push(material.name);
          materialData.push(material.stock);
          materialColors.push(this.colorCodes[material.name]);
        });

        return { materialData, materialLabels, materialColors };
      })
    ).subscribe(({ materialData, materialLabels, materialColors }) => {
      this.barChartData = [{ data: materialData, label: 'Stock Quantity', backgroundColor: materialColors }];
      this.barChartLabels = materialLabels;
    });
  }
}