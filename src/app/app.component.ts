import { Component } from '@angular/core';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';
import { AppConstants } from './shared/app.constants';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CentreCardComponent } from './components/centre-card/centre-card.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

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
    MatSlideToggleModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatButtonToggleModule, MatMenuModule,  MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule
  ],
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