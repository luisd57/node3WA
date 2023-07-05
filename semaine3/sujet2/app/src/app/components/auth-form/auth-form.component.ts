import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  @Input() isLoginMode: boolean = true;
  @Output() onFormSubmit = new EventEmitter<User>();

  authForm: FormGroup;
  isSubmitting: boolean = false;
  isError: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitting = true;
    this.onFormSubmit.emit(this.authForm.value);
  }

}
