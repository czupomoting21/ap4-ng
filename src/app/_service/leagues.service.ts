import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApTeamCount } from '../_model/ap-team-count';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  baseApiUri = environment.baseApiUri;

  constructor(private http: HttpClient) {}

  getTeamNames(leagueId: number): Observable<ApTeamCount[]> {
    const url = `${this.baseApiUri}/leagues/${leagueId}/team-names`;
    return this.http.get<ApTeamCount[]>(url);
  }
}
