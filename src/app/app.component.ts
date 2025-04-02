import { Component } from '@angular/core';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';

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
  bvHelplineNumber = '+91 44 4011 5500';
  value: any;
  districts: any;
  searchCriteria: string = 'Area';

  constructor(private educationCentreService: EducationCentreService) {
  }
  
  ngOnInit() {
    // this.educationCentreService.getCentres();
    this.educationCentreService.readJsonFromAssets();
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