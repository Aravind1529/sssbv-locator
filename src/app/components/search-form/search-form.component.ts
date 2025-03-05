import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { EducationCentreService } from '../../services/education-centre.service';
import { EMPTY, NEVER } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule,NgSelectComponent, CommonModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  areas: any[] = [];
  pincode: string = '';
  selectedArea!: string;
  uniqueCities!: any[];
  selectedCity!: string;
  filteredAreas!: any[];
  disableArea: boolean = true;
  @Output() search = new EventEmitter<{area: string, pincode: string}>();
  @Output() clearSearch = new EventEmitter<null>();

  constructor(private educationService: EducationCentreService) {
    this.educationService.areas$.subscribe(x=> {
      this.areas = x;
      this.uniqueCities = [...new Set(this.areas.map(x => x.city))];
      // console.log(this.uniqueCities);
    });
    this.educationService.selectedAreaHasValue$.subscribe(x=> {
      if(!x) this.selectedArea = 'Select any Area';
    });
  }
  onSearch() {
    // this.clearSearch.emit();
    if(this.selectedCity && !this.selectedArea) return;
    if(this.selectedArea === 'Select any Area') this.selectedArea = '';
    if (this.selectedArea?.trim() || this.pincode.trim()) {
      this.search.emit({ area: this.selectedArea ? this.selectedArea?.trim(): '', pincode: this.pincode.trim() });
    }
  }

  // disableSearch() {
  //   if(this.pincode) {
  //     console.log('this.pincode',this.pincode); 
  //     return false;
  //   };
  //   if(this.selectedArea && this.selectedCity) {
  //     console.log('this.selectedArea && this.selectedCity' , this.selectedArea, this.selectedCity);  
  //     return false;
  //   }
  //   return true;
  // }

  onCitySelect() {
    // console.log('city', this.selectedCity);
    this.selectedArea = 'Select area';
    this.pincode = '';
    this.disableArea = false;
    this.clearSearch.emit();
    this.filteredAreas = this.areas.filter(area => area.city == this.selectedCity);
  }
}