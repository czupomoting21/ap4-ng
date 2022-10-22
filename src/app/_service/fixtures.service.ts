import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApFixture } from '../_model/ap-fixture';
import { ApLeague } from '../_model/ap-league';
import { ApOddsMoneylineExt } from '../_model/ap-odds-moneyline-ext';
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
    const url = `${this.baseApiUri}/sports/${sportId}/leagues?withExistingFixtures=true`;
    return this.http.get<ApLeague[]>(url);
  }

  getFutureEventsForLeagues(
    sportId: number,
    leagueIds: number[]
  ): Observable<ApFixture[]> {
    const url = `${
      this.baseApiUri
    }/sports/${sportId}/next-fixtures?leagueIds=${leagueIds.join(',')}`;
    return this.http.get<ApFixture[]>(url);
  }

  getMoneylineOddsHistoryForFixture(
    fixtureId: number
  ): Observable<ApOddsMoneylineExt[]> {
    const url = `${this.baseApiUri}/fixtures/${fixtureId}/odds-history/moneyline`;
    return this.http.get<ApOddsMoneylineExt[]>(url);
  }
}
