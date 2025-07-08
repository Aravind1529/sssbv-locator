import { Component } from '@angular/core';
import { EducationCentre } from './models/education-centre.model';
import { EducationCentreService } from './services/education-centre.service';
import { AppConstants } from './shared/app.constants';
import { CreateCentreDialogComponent } from './components/create-centre-dialog/create-centre-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private readonly educationCentreService: EducationCentreService, private dialog: MatDialog) {
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

  openDialog(): void {
    this.dialog.open(CreateCentreDialogComponent, {
      width: '800px',
      data: { message: 'Hello from parent!' }
    });
  }
  editDialog(): void {
    this.dialog.open(CreateCentreDialogComponent, {
      width: '800px',
      data: { message: 'Hello from parent!' }
    });
  }
  deleteDialog(): void {
    this.dialog.open(CreateCentreDialogComponent, {
      width: '800px',
      data: { message: 'Hello from parent!' }
    });
  }
}