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
    this.getCentresURL = 'https://run.mocky.io/v3/b02f4f2b-408b-4b90-bea5-a91a1ffa57c5';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    this.http.get<EducationCentre[]>(this.getCentresURL, { headers }).subscribe(x => {
      console.log('bv centres in cmse are: ', x );
      this.mockCentres = x;
    })
  }

  searchCentres(area: string, pincode: string): Observable<EducationCentre[]> {
    return of(this.mockCentres.filter(centre => 
      centre.area.toLowerCase().includes(area.toLowerCase()) &&
      centre.pincode.includes(pincode)
    ));
  }
  
}