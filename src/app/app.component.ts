import { Component } from '@angular/core';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';
import { AppConstants } from './shared/app.constants';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  title = 'sssbv-locator';
  centres: EducationCentre[] = [];
  searched = false;
  value: any;
  districts: any;
  searchCriteria: string = 'Area';
  constants = AppConstants;
  isAuthenticatedUser: boolean = false;

  constructor(
    private educationCentreService: EducationCentreService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.educationCentreService.clearCentres$.subscribe((x) => {
      this.reset();
    });
  }

  ngOnInit() {
    this.educationCentreService.getCentres();
  }

  onSearch(searchData: any) {
    this.educationCentreService
      .searchCentres(searchData, this.searchCriteria)
      .subscribe((results) => {
        this.centres = results;
        this.searched = true;
      });
  }

  reset() {
    this.centres = [];
    this.searched = false;
  }

  switchTab() {
    this.educationCentreService.clearModels$.next(true);
  }

  authenticateUser() {
    if (localStorage.getItem('auth_token')) {
      this.authService.logout();
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && localStorage.getItem('role')?.includes('dec')) {
          alert('Logged in as DEC');
        }
      });
      // this.educationCentreService.clearModels$.next(true);
    }
  }
}