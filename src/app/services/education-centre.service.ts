import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EducationCentre } from '../models/education-centre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationCentreService {
  constructor(private http: HttpClient) {} 
  getCentresURL!: string;
  private mockCentres: EducationCentre[] = [];
  samithis: any;
  
  getCentres() {
    console.log(JSON.stringify(this.mockCentres));
    this.getCentresURL = 'https://tnnbvcentres-cmse.onrender.com/tnnBvCentres';
    // const headers = new HttpHeaders().set('Accept', 'application/json');
    this.http.get<EducationCentre[]>(this.getCentresURL).subscribe(x => {
      console.log('bv centres in cmse are: ', x );
      this.mockCentres = x;
    },(error) => {
      console.error('Error fetching data:', error);
    });
  }

  searchCentres(area: string, pincode: string): Observable<EducationCentre[]> {
    return of(this.mockCentres.filter(centre => 
      centre.area?.toLowerCase().includes(area?.toLowerCase()) &&
      centre.pincode.includes(pincode)
    ));
  }
  
}