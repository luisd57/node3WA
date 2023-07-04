import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  activeTab: string = 'login';

  constructor(private authService: AuthService) { }

  onGoogleLogin(): void {
    this.authService.googleLogin();
  }
}
