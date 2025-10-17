import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { EducationCentreService } from '../../services/education-centre.service';
import { EMPTY, NEVER } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EducationCentre } from '../../models/education-centre.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCentreDialogComponent } from '../create-centre-dialog/create-centre-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule,NgSelectComponent, CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule
   ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  areas: EducationCentre[] = [];
  // pincode: string = '';
  selectedArea!: string;
  uniqueCities!: any[];
  selectedCity!: string;
  filteredAreas!: any[];
  disableArea: boolean = true;
  uniqueAreas!: any[];
  @Output() search = new EventEmitter<{}>();
  @Output() clearSearch = new EventEmitter<null>();
  @Input() searchCriteria! : string;
  @ViewChild('selectCity') selectCity!: NgSelectComponent; 
  @ViewChild('selectArea') selectArea!: NgSelectComponent; 
  pincode = new FormControl('', [
    Validators.required,
    Validators.pattern('^[1-9][0-9]{5}$')
  ]);
  loading!: boolean;

  constructor(private educationService: EducationCentreService, private dialog: MatDialog) {
    this.educationService.areas$.subscribe(x=> {
      this.areas = x;
      this.uniqueCities = [...new Set(this.areas.map(x => x.city))].sort();
    });
    this.educationService.loading$.subscribe(x=> {
      this.loading = x;
    })
    this.educationService.clearModels$.subscribe(isClearModel=> {
      if(isClearModel) {
        this.selectArea?.clearModel();
        this.selectCity?.clearModel();
        this.pincode.setValue(null);
      }
    });
  }

  onSearch() {
    this.searchCriteria == 'Area' ? this.searchByArea() : this.searchByPincode();
  }
  
  searchByArea() {
    if(this.selectedCity && !this.selectedArea) return;
    if (this.selectedArea?.trim()) {
      this.search.emit({ area: this.selectedArea ? this.selectedArea?.trim(): '', city: this.selectedCity ? this.selectedCity?.trim(): ''});
    }
  }

  searchByPincode() {
    if (this.pincode.value && this.pincode.valid) {
      this.search.emit({pincode: this.pincode.value});
    } else {
      return;
    }
  }

  onCitySelect() {
    // console.log('city', this.selectedCity);
    this.selectArea.clearModel();
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

  onClearArea() {
    this.clearSearch.emit();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { isCreateCentre: true } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form result:', result);
      }
    });
  }
}