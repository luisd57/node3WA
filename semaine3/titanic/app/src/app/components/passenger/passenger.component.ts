import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/Passenger';
import { PassengersService } from 'src/app/services/passengers.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  passengers: Passenger[] = [];

  constructor(private passengerService: PassengersService) { }

  ngOnInit(): void {
    this.passengerService.getAllPassengers().subscribe({
      next: (data) => {
        this.passengers = data;
      },
      error: (error) => console.error('Error: ', error)
    });
  }


}
