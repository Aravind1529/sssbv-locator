import { Component, Input } from '@angular/core';
import { EducationCentre } from '../../models/education-centre.model';

@Component({
  selector: 'app-centre-card',
  standalone: true,
  templateUrl: './centre-card.component.html',
  styleUrl: './centre-card.component.scss'
})
export class CentreCardComponent {
  @Input() centre!: EducationCentre;
}