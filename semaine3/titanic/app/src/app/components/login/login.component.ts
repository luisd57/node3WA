import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onSubmitLogin(): void {
    this.isSubmitting = true;
    const user: User = this.loginForm.value;

    this.authService.login(user).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('User logged in successfully.');
        alert(`Welcome ${response.username}`);
        this.router.navigate(['/passengers']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Login failed.');
      }
    });
  }

}
