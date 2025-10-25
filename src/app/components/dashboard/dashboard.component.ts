import { Component } from '@angular/core';
// import { EducationCentre } from './models/education-centre.model';
// import { EducationCentreService } from './services/education-centre.service';
// import { AppConstants } from './shared/app.constants';
import { Router } from '@angular/router';
import { EducationCentre } from '../../models/education-centre.model';
import { AppConstants } from '../../shared/app.constants';
import { EducationCentreService } from '../../services/education-centre.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from '../search-form/search-form.component';
import { CentreCardComponent } from '../centre-card/centre-card.component';import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatButton , MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
  imports: [SearchFormComponent, 
      CentreCardComponent,CommonModule, FormsModule, 
      MatSlideToggleModule,
          BrowserAnimationsModule,
          ButtonModule,
          AutoCompleteModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
          MatAutocompleteModule,
          ReactiveFormsModule,
          NgSelectModule,
          MatTooltip, MatButtonModule, MatDividerModule, MatIconModule, MatButtonToggleModule, MatMenuModule,
          MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = 'sssbv-locator';
  centres: EducationCentre[] = [];
  searched = false;
  value: any;
  districts: any;
  searchCriteria: string = 'Area';
  constants = AppConstants;

  constructor(private educationCentreService: EducationCentreService, private router: Router) {
    this.educationCentreService.clearCentres$.subscribe(x=> {
      this.reset();
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
    this.router.navigate(['/login']);
    this.educationCentreService.clearModels$.next(true);
  }
}
