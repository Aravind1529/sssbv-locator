import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EducationCentre } from '../models/education-centre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../shared/app.constants';

export interface OperationMessage {
  type: 'success' | 'error';
  message: string;
}

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
  clearCentres$ = new BehaviorSubject<boolean>(false);
  deleteMessage$ = new BehaviorSubject<OperationMessage | null>(null);
  createMessage$ = new BehaviorSubject<OperationMessage | null>(null);
  editMessage$ = new BehaviorSubject<OperationMessage | null>(null);
  private jsonUrl = 'assets/json/bvCentres.json';
  loading$ = new BehaviorSubject<boolean>(true);

  async getCentres() {
    this.getCentresURL = `${AppConstants.BASE_URL}/api/centres`;

    this.http.get<EducationCentre[]>(this.getCentresURL).subscribe(
      (x) => {
        this.balvikasCentres = x;
        this.areas$.next(this.balvikasCentres);
        this.loading$.next(false);
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading$.next(true);
      }
    );
  }

  createCentre(centre: any) {
    // API endpoint (adjust if your backend uses a different route)
    const createURL = `${AppConstants.BASE_URL}/api/create-centre`;
    this.clearCentres$.next(true);
    this.clearModels$.next(true);
    this.loading$.next(true);
    this.http.post<EducationCentre>(createURL, centre).subscribe(
      (createdCentre) => {
        this.loading$.next(false);
        this.getCentres();
        console.log('Centre created successfully:', createdCentre);
        this.createMessage$.next({
          type: 'success',
          message: 'Centre created successfully'
        });
      },
      (error) => {
        this.loading$.next(false);
        console.error('Error creating centre:', error);
        this.createMessage$.next({
          type: 'error',
          message: 'Error creating centre. Please try again.'
        });
      }
    );
  }

  updateCentre(centre: any) {
    // API endpoint (adjust if your backend uses a different route)
    const updateURL = `${AppConstants.BASE_URL}/api/centre/${centre.id}`;
    this.clearCentres$.next(true);
    this.clearModels$.next(true);
    this.loading$.next(true);
    this.http.put<EducationCentre>(updateURL, centre).subscribe(
      (updatedCentre) => {
        this.loading$.next(false);
        this.getCentres();
        console.log('Centre updated successfully:', updatedCentre);
        this.editMessage$.next({
          type: 'success',
          message: 'Centre updated successfully'
        });
      },
      (error) => {
        this.loading$.next(false);
        console.error('Error updating centre:', error);
        this.editMessage$.next({
          type: 'error',
          message: 'Error updating centre. Please try again.'
        });
      }
    );
  }

  async deleteCentre(id: string) {
    const deleteURL = `${AppConstants.BASE_URL}/api/centre/${id}`;
    this.clearCentres$.next(true);
    this.clearModels$.next(true);
    this.loading$.next(true);
    await this.http.delete(deleteURL).subscribe(
      () => {
        this.loading$.next(false);
        console.log('Deleted successfully');
        this.deleteMessage$.next({
          type: 'success',
          message: 'Centre deleted successfully'
        });
        // Optionally refresh the list
        this.getCentres();
      },
      (error) => {
        this.loading$.next(false);
        console.error('Error deleting centre:', error);
        this.deleteMessage$.next({
          type: 'error',
          message: 'Error deleting centre. Please try again.'
        });
      }
    );
  }

  async authenticateUser(credentials: any) {
    const authenticateCentresURL = `${AppConstants.BASE_URL}/api/authenticate-user`;

    return this.http.post<EducationCentre>(authenticateCentresURL, credentials);
  }

  searchCentres(
    searchData: any,
    criteria: string
  ): Observable<EducationCentre[]> {
    if (criteria == 'Area') {
      const filteredCentres = this.balvikasCentres.filter(
        (centre) =>
          centre.area?.toLowerCase().includes(searchData.area?.toLowerCase()) &&
          centre.city?.includes(searchData.city)
      );
      const uniqueByAddress = filteredCentres.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.address === obj.address)
      );
      return of(uniqueByAddress);
    } else {
      return of([
        ...new Set(
          this.balvikasCentres.filter((centre) =>
            centre.pincode?.includes(searchData.pincode)
          )
        ),
      ]);
    }
  }

  readJsonFromAssets() {
    this.http.get<EducationCentre[]>(this.jsonUrl).subscribe(
      (x) => {
        this.balvikasCentres = x;
        this.balvikasCentres.map((x) => {
          x.city =
            x.district?.includes('Chennai ') ||
            x.district?.includes('Thiruvallur ')
              ? 'Chennai'
              : x.district;
        });
        this.areas$.next(this.balvikasCentres);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}