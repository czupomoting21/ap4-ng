import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApSport } from '../_model/ap-sport';
import { SLeague } from '../_model/stats/s-league';
import { STeam } from '../_model/stats/s-team';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  baseApiUri = environment.baseApiUri;

  constructor(private http: HttpClient) {}

  getLeagues(): Observable<SLeague[]> {
    const url = `${this.baseApiUri}/stats/leagues`;
    return this.http.get<SLeague[]>(url);
  }

  getAllTeams(): Observable<STeam[]> {
    const url = `${this.baseApiUri}/stats/teams`;
    return this.http.get<STeam[]>(url);
  }

  updateTeam(team: STeam): Observable<STeam> {
    const url = `${this.baseApiUri}/stats/teams/${team?.id}`;
    return this.http.put<STeam>(url, team);
  }

}
