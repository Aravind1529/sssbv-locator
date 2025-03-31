import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { EducationCentreService } from '../../services/education-centre.service';
import { EMPTY, NEVER } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EducationCentre } from '../../models/education-centre.model';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule,NgSelectComponent, CommonModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  areas: EducationCentre[] = [];
  pincode: string = '';
  selectedArea!: string;
  uniqueCities!: any[];
  selectedCity!: string;
  filteredAreas!: any[];
  disableArea: boolean = true;
  uniqueAreas!: any[];
  @Output() search = new EventEmitter<{area: string, pincode: string, city: string}>();
  @Output() clearSearch = new EventEmitter<null>();
  @Input() searchCriteria! : string;

  constructor(private educationService: EducationCentreService) {
    this.educationService.areas$.subscribe(x=> {
      this.areas = x;
      this.uniqueCities = [...new Set(this.areas.map(x => x.city))];
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
      this.search.emit({ area: this.selectedArea ? this.selectedArea?.trim(): '', pincode: this.pincode.trim(), city: this.selectedCity ? this.selectedCity?.trim(): ''});
    }
  }

  onCitySelect() {
    // console.log('city', this.selectedCity);
    this.selectedArea = 'Select area';
    this.pincode = '';
    this.disableArea = false;
    this.clearSearch.emit();
    this.getDistinctAreas(this.areas);
  }
  
  getDistinctAreas(areasList: EducationCentre[]) {
    let samithisGrouped: any[] = [];
    
    this.filteredAreas = areasList.filter(area => area.city === this.selectedCity);
    
    samithisGrouped = this.filteredAreas.map((centre) => {
      return { area: centre.area?.trim(), district: centre.district?.trim(), city: centre.city?.trim() };
    });
    this.uniqueAreas = Array.from(
      new Map(
        samithisGrouped.map((samithi) => [samithi.area, samithi])
      ).values()
    );
    this.filteredAreas = this.uniqueAreas.sort((a,b) => a.area.localeCompare(b.area));
  }
}