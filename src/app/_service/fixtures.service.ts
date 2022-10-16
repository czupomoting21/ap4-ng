import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApLeague } from '../_model/ap-league';
import { ApSport } from '../_model/ap-sport';

@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  baseApiUri = 'https://desktop-qi9h79a:8080/api';

  constructor(private http: HttpClient) {}

  getSports(): Observable<ApSport[]> {
    const url = `${this.baseApiUri}/sports/`;
    return this.http.get<ApSport[]>(url);
  }

  getLeaguesForSport(sportId: number): Observable<ApLeague[]> {
    const url = `${this.baseApiUri}/sports/${sportId}/leagues`;
    return this.http.get<ApLeague[]>(url);
  }
}
