import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-centre-dialog',
  templateUrl: './create-centre-dialog.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  styleUrl: './create-centre-dialog.component.scss'
})
export class CreateCentreDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateCentreDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
