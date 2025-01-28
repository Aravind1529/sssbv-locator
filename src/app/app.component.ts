import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig } from '@ng-select/ng-select';

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
  items: any;
  value: any;

  constructor(private educationCentreService: EducationCentreService) {}

  ngOnInit() {
    this.educationCentreService.getCentres();
  }

  onSearch(searchData: {area: string, pincode: string}) {
    this.educationCentreService.searchCentres(searchData.area, searchData.pincode)
      .subscribe(results => {
        this.centres = results;
        this.searched = true;
      });
  }

}