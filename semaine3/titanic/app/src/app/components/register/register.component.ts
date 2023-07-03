import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitRegister(): void {
    this.isSubmitting = true;
    const user: User = this.registerForm.value;

    this.authService.register(user).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('User registered successfully.');
        alert(`Welcome ${response.username}`);
        this.router.navigate(['/passengers']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Registration failed.');
      }
    });
  }


}
