import { Component, OnDestroy } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { Passenger } from 'src/app/models/Passenger';
import { PassengersService } from 'src/app/services/passengers.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnDestroy {

  public currentChartData = { data: [0, 0], labels: ['Total', 'Alive'] };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartPlugins = [];
  public pieChartLegend = true;

  private destroy$ = new Subject<void>();

  constructor(private passengerService: PassengersService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  filterByAliveWomen() {
    this.passengerService.getAllPassengers().pipe(
      switchMap((passengers: Passenger[]) => {
        const totalWomen = passengers.filter(p => p.Sex === 'female').length;
        return this.passengerService.getAliveWomen().pipe(
          takeUntil(this.destroy$),
          map((aliveWomen: Passenger[]) => {
            return { totalWomen, aliveWomen: aliveWomen.length };
          })
        );
      })
    ).subscribe(({ totalWomen, aliveWomen }) => {
      this.currentChartData.data = [totalWomen, aliveWomen];
      this.currentChartData.labels = ['Deceased Women', 'Alive Women'];
    });
  }

  filterByAliveMen() {
    this.passengerService.getAllPassengers().pipe(
      switchMap((passengers: Passenger[]) => {
        const totalMen = passengers.filter(p => p.Sex === 'male').length;
        return this.passengerService.getAliveMen().pipe(
          takeUntil(this.destroy$),
          map((aliveMen: Passenger[]) => {
            return { totalMen, aliveMen: aliveMen.length };
          })
        );
      })
    ).subscribe(({ totalMen, aliveMen }) => {
      this.currentChartData.data = [totalMen, aliveMen];
      this.currentChartData.labels = ['Deceased Men', 'Alive Men'];
    });
  }

  filterBySurvived() {
    this.passengerService.getAllPassengers().pipe(
      takeUntil(this.destroy$),
      switchMap((passengers: Passenger[]) => {
        const deadPassengers = passengers.filter(p => p.Survived === 0).length;
        return this.passengerService.getAlivePassengers().pipe(
          map((alivePassengers: Passenger[]) => {
            return { deadPassengers, alivePassengers: alivePassengers.length };
          })
        );
      })
    ).subscribe(({ deadPassengers, alivePassengers }) => {
      this.currentChartData.data = [deadPassengers, alivePassengers];
      this.currentChartData.labels = ['Died', 'Survived'];
    });
  }


}
