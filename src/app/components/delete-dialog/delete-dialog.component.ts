import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { EducationCentreService } from '../../services/education-centre.service';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private educationCentreService: EducationCentreService,
    private toastr: ToastrService
  ) {}

  async confirmDelete() {
    console.log(this.data);
    await this.educationCentreService.deleteCentre(this.data.id);
    
    // Subscribe to delete message
    this.educationCentreService.deleteMessage$.subscribe((message) => {
      if (message) {
        if (message.type === 'success') {
          this.toastr.success(message.message);
        } else {
          this.toastr.error(message.message);
        }
      }
    });
    
    this.dialogRef.close(true); // send confirmation
  }
  cancel() {
    this.dialogRef.close(true); // send confirmation
  }
}

