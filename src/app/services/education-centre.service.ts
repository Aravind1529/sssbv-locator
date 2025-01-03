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

  getCentres() {
    console.log(JSON.stringify(this.mockCentres));
    this.getCentresURL = 'https://run.mocky.io/v3/abd7c9d1-d50e-4e71-aeaf-4b2f01ce9243';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    this.http.get<EducationCentre[]>(this.getCentresURL, { headers }).subscribe(x => {
      console.log('bv centres in cmse are: ', x );
      this.mockCentres = x;
    })
  }

  searchCentres(area: string, pincode: string): Observable<EducationCentre[]> {
    return of(this.mockCentres.filter(centre => 
      centre.area?.toLowerCase().includes(area?.toLowerCase()) &&
      centre.pincode.includes(pincode)
    ));
  }
  
}