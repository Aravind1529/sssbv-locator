import { Component } from '@angular/core';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';
import { AppConstants } from './shared/app.constants';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

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

  constructor(private educationCentreService: EducationCentreService, 
    private router: Router, private authService: AuthService) {
    this.educationCentreService.clearCentres$.subscribe(x=> {
      this.reset();
    });
    this.authService.isLoggedIn$.subscribe(x => {
      this.isAuthenticatedUser = x;
    })
  }
  
  ngOnInit() {
    this.educationCentreService.getCentres();
    // this.educationCentreService.readJsonFromAssets();
  }

  onSearch(searchData: any) {
    this.educationCentreService.searchCentres(searchData, this.searchCriteria)
      .subscribe(results => {
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
  
  login() {
    if(!this.isAuthenticatedUser) {
      this.router.navigate(['/login']);
      this.educationCentreService.clearModels$.next(true);
    } else {
      this.authService.logout();
    }
  }
}