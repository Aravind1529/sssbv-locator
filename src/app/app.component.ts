import { Component } from '@angular/core';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';
import { AppConstants } from './shared/app.constants';

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

  constructor(private educationCentreService: EducationCentreService) {
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
}