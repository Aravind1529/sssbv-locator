import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EducationCentre } from '../models/education-centre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EducationCentreService {
  constructor(private http: HttpClient) {}
  balvikasCentres: EducationCentre[] = [];
  getCentresURL!: string;
  samithis: any;
  areas$ = new BehaviorSubject<any[]>([]);
  clearModels$ = new BehaviorSubject<boolean>(false);
  private jsonUrl = 'assets/json/bvCentres.json';

  getCentres() {
    // console.log(JSON.stringify(this.balvikasCentres));
    // this.getCentresURL = 'http://localhost:3000/api/centres';
    
    this.getCentresURL = 'https://bv-locator-services.onrender.com/api/centres';
    this.http.get<EducationCentre[]>(this.getCentresURL).subscribe(
      (x) => {
        // console.log('bv centres in cmse are: ', x);
        this.balvikasCentres= x;
        this.balvikasCentres.map((x) => {
          x.city = (x.district?.includes('Chennai ') || x.district?.includes('Thiruvallur ')) ? 'Chennai' : x.district;
        });
        this.areas$.next(this.balvikasCentres);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  searchCentres(searchData: any, criteria: string): Observable<EducationCentre[]> {
    if(criteria == 'Area') {
      return of(
        this.balvikasCentres.filter(
          (centre) =>
            centre.area?.toLowerCase().includes(searchData.area?.toLowerCase()) &&
            centre.city?.includes(searchData.city)
        )
      );
    } else {
      return of(
        this.balvikasCentres.filter(
          (centre) =>
            centre.pincode?.includes(searchData.pincode)
        )
      );
    }
  }

  readJsonFromAssets() {
    this.http.get<EducationCentre[]>(this.jsonUrl).subscribe(
      (x) => {
        this.balvikasCentres = x;
        this.balvikasCentres.map((x) => {
          x.city = (x.district?.includes('Chennai ') || x.district?.includes('Thiruvallur ')) ? 'Chennai' : x.district;
        });
        this.areas$.next(this.balvikasCentres);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}