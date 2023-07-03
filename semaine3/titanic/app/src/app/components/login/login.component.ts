import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (response) => console.log('User logged in successfully.'),
      error: (error) => console.error('Login failed.')
    });
  }


}
