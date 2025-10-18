import { Component, Input } from '@angular/core';
import { EducationCentre } from '../../models/education-centre.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { EducationCentreService } from '../../services/education-centre.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-centre-card',
  standalone: true,
  templateUrl: './centre-card.component.html',
  styleUrl: './centre-card.component.scss',
  imports: [CommonModule],
})
export class CentreCardComponent {
  @Input() centre!: EducationCentre;

  constructor(
    private dialog: MatDialog,
    private educationCentreService: EducationCentreService
  ) {}

  openEditDialog(centre: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { centre: {...centre},  isCreateCentre: false},
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        console.log(result); // update user if dialog saved
        await this.educationCentreService.getCentres();
        // await this.educationCentreService.searchCentres({city: result.city, area: result.area}, 'Area');
      }
    });
  }

  openDeleteDialog(centre: any) {
    console.log(centre);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: { name: centre.centreName, id: centre.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.deleteCentre(centre._id);
      }
    });
  }
}