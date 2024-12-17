import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EducationCentre } from '../models/education-centre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationCentreService {
  // constructor(private http: HttpClient) {

  // }
  private mockCentres: EducationCentre[] = [
    {
      id: 1,
      name: 'Excel Learning Centre',
      address: '123 Education Street',
      area: 'Downtown',
      pincode: '400001',
      type: 'Tutoring Centre',
      rating: 4.5,
      contact: '+1 234-567-8900'
    },
    {
      id: 2,
      name: 'Bright Minds Academy',
      address: '456 Knowledge Avenue',
      area: 'Downtown',
      pincode: '400001',
      type: 'Language School',
      rating: 4.8,
      contact: '+1 234-567-8901'
    }
  ];

  getCentres() {

  }

  searchCentres(area: string, pincode: string): Observable<EducationCentre[]> {
    return of(this.mockCentres.filter(centre => 
      centre.area.toLowerCase().includes(area.toLowerCase()) &&
      centre.pincode.includes(pincode)
    ));
  }
}