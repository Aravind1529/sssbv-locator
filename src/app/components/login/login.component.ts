import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EducationCentreService } from '../../services/education-centre.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';
  hide= true;
  role :any;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginComponent>, private educationCentreService: EducationCentreService) {}

  async onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    try {
      const res = await firstValueFrom(
        await this.educationCentreService.authenticateUser({
          username: this.username,
          password: this.password,
        })
      );
      this.errorMessage = '';
      this.authService.setSession("loggedIn");
      localStorage.setItem('user', this.username);
      localStorage.setItem('role', 'DEC');
      this.authService.isLoggedIn$.next(true);
      this.dialogRef.close(res); 
    } catch (err) {
      console.error(err);
      this.authService.isLoggedIn$.next(false);
      this.authService.clearLocalStorage();
      this.errorMessage = 'Invalid credentials. Please try again.';
    }
  }

  onInputChange() {
    this.errorMessage = ''; // clear error when user types again
  }
}

