import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  activeTab: string = 'login';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmitLogin(user: User): void {
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('User logged in successfully.');
        alert(`Welcome ${response.username}`);
        this.authService.setUser(response);
        this.router.navigate(['https://www.google.com/']);
      },
      error: (error) => {
        console.error('Login failed.');
      }
    });
  }

  onSubmitRegister(user: User): void {
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered successfully.');
        alert(`Welcome ${response.username}`);
        this.authService.setUser(response);
      },
      error: (error) => {
        console.error('Registration failed.');
      }
    });
  }
}
