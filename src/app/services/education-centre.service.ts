import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EducationCentre } from '../models/education-centre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EducationCentreService {
  constructor(private http: HttpClient) {}
  getCentresURL!: string;
  private mockCentres: EducationCentre[] = [];
  samithis: any;
  areas$ = new BehaviorSubject<any[]>([]);
  private jsonUrl = 'assets/json/valid-jan28.json';

  getCentres() {
    console.log(JSON.stringify(this.mockCentres));
    this.getCentresURL = 'https://tnnbvcentres-cmse.onrender.com/tnnBvCentres';
    // const headers = new HttpHeaders().set('Accept', 'application/json');
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

  groupCentres() {}

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
      return { area: centre.area, district: centre.district };
    });
    const uniqueAreas = Array.from(
      new Map(
        samithisGrouped.map((samithi) => [samithi.area, samithi])
      ).values()
    );
    console.log('unique', uniqueAreas);
    this.areas$.next(uniqueAreas.sort((a, b) => a.area.localeCompare(b.area)));
  }
}