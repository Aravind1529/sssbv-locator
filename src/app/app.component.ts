import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { EducationCentre } from './models/education-centre.model';
import { AuthService } from './services/auth.service';
import { EducationCentreService } from './services/education-centre.service';
import { AppConstants } from './shared/app.constants';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule
  ],
})
export class AppComponent implements OnInit{
  title = 'sssbv-locator';
  centres: EducationCentre[] = [];
  searched = false;
  value: any;
  districts: any;
  searchCriteria: string = 'Area';
  constants = AppConstants;
  isAuthenticatedUser: boolean = false;
  opened = true;

  constructor(
    private educationCentreService: EducationCentreService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.educationCentreService.clearCentres$.subscribe((x) => {
      this.reset();
    });
  }

  ngOnInit() {
    this.educationCentreService.getCentres();
  }

  toggleSidenav() {
    this.opened = !this.opened;
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
      this.openConfirmDialog();
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && localStorage.getItem('role')?.includes('dec')) {
          // alert('Logged in as DEC');
          this.toastr.success('Logged in as DEC !');
        }
      });
      // this.educationCentreService.clearModels$.next(true);
    }
  }
  
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to logout ?' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.toastr.info('Logged out !');
        // perform delete or other action
      } else {
        console.log('User cancelled logout');
      }
    });
  }
}