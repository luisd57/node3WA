import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => console.log('User registered successfully.'),
      error: (error) => console.error('Registration failed.')
    });
  }
  

}
