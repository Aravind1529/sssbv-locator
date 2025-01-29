import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { EducationCentreService } from '../../services/education-centre.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule,NgSelectComponent,],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  area: string = '';
  areas: any[] = [];
  pincode: string = '';
  selectedArea: any;
  @Output() search = new EventEmitter<{area: string, pincode: string}>();

  constructor(private educationService: EducationCentreService) {
    this.educationService.areas$.subscribe(x=> {
      this.areas = x;
    });
  }
  onSearch() {
    if (this.selectedArea?.trim() || this.pincode.trim()) {
      this.search.emit({ area: this.selectedArea?.trim(), pincode: this.pincode.trim() });
    }
  }
}