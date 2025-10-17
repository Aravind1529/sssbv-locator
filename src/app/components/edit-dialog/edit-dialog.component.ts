import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EducationCentreService } from '../../services/education-centre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  imports: [ FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule, 
  CommonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})

export class EditDialogComponent {
  saiDistrictsTNS = ["Dindigul","Tirunelveli","Sivagangai","Kanchi North","Manamadurai","Tirupattur","Kanyakumari","Tuticorin ","Thiruvannamalai","Palani","Theni","ERODE","Villupuram","Pudukottai","Trichy","Dharmapuri","Thanjavur","Coimbatore","Karur","Kanchi South","Madurai","Virudhunagar","Salem"];
  saiDistrictsTNN = ["Chennai North West", "Mayiladuthurai", "Thiruvallur West", "Pondicherry", "Thiruvallur East", "Chennai South", "Chennai North", "Chennai South East", "Chennai East Coast", "Cuddalore", "Chennai West", "Nagai"];
  saiState = ["TamilNadu North", "TamilNadu South"];
  saiDistricts!: string[];
 constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private educationCentreService: EducationCentreService
  ) {
  }

  save() {
    if(this.data.isCreateCentre) {
      this.educationCentreService.createCentre(this.data);
    } else {
      this.educationCentreService.updateCentre(this.data);
    }
    this.dialogRef.close(this.data); 
  }

  cancel() {
    this.dialogRef.close();
  }
  
  onStateChange(state: any) {
    console.log('selected state:' + state);
    if(state === 'TamilNadu South') this.saiDistricts = this.saiDistrictsTNS.sort();
    if(state === 'TamilNadu North') this.saiDistricts = this.saiDistrictsTNN.sort();
  }
}
