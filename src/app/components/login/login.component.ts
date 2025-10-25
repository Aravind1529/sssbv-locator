import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    this.auth.login({ email: this.username, password: this.password }).subscribe({
      next: (message) => {
       console.log(message);
       if (message.includes('logged in')) {
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error: (message) => {
        this.errorMessage = 'Invalid Username or password.';
        console.log(message);
      }
    });
  }

  onInputChange() {
    this.errorMessage = ''; // clear error when user types again
  }
}

