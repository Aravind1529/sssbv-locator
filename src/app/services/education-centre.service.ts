import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EducationCentre } from '../models/education-centre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EducationCentreService {
  constructor(private http: HttpClient) {}
  mockCentres: EducationCentre[] = [];
  getCentresURL!: string;
  samithis: any;
  areas$ = new BehaviorSubject<any[]>([]);
  selectedAreaHasValue$ = new BehaviorSubject<boolean>(true);
  private jsonUrl = 'assets/json/valid-jan28.json';

  getCentres() {
    console.log(JSON.stringify(this.mockCentres));
    // this.getCentresURL = 'https://tnnbvcentres-cmse.onrender.com/tnnBvCentres';
    // this.getCentresURL = 'http://localhost:3000/api/centres';

    this.getCentresURL = 'https://bv-locator-services.onrender.com/api/centres';
    this.http.get<EducationCentre[]>(this.getCentresURL).subscribe(
      (x) => {
        console.log('bv centres in cmse are: ', x);
        this.mockCentres = x;
        this.getDistinctAreas(this.mockCentres);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  searchCentres(area: string, pincode: string): Observable<EducationCentre[]> {
    return of(
      this.mockCentres.filter(
        (centre) =>
          centre.area?.toLowerCase().includes(area?.toLowerCase()) &&
          centre.pincode.includes(pincode)
      )
    );
  }

  readJsonFromAssets() {
    this.http.get<EducationCentre[]>(this.jsonUrl).subscribe(
      (x) => {
        console.log('from local ', x);
        this.getDistinctAreas(x);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getDistinctAreas(areasList: EducationCentre[]) {
    let samithisGrouped: any[] = [];
    samithisGrouped = areasList.map((centre) => {
      return { area: centre.area.trim(), district: centre.district.trim() };
    });
    const uniqueAreas = Array.from(
      new Map(
        samithisGrouped.map((samithi) => [samithi.area, samithi])
      ).values()
    );
    uniqueAreas.map((x) => {
      x.city = (x.district.includes('Chennai ') || x.district.includes('Thiruvallur ')) ? 'Chennai' : x.district;
    });
    console.log('unique', uniqueAreas);
    this.areas$.next(uniqueAreas.sort((a, b) => a.area.localeCompare(b.area)));
  }
}