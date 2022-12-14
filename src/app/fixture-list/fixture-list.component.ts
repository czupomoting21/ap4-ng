import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApLeague } from '../_model/ap-league';
import { ApSport } from '../_model/ap-sport';
import { FixturesService } from '../_service/fixtures.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, from, of, zip } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApFixture } from '../_model/ap-fixture';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'underscore';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.scss'],
})
export class FixtureListComponent implements OnInit {
  sports: ApSport[] = [];
  leagues: ApLeague[] = [];
  fixtures: ApFixture[] = [];
  fixturesByDay: { [key: string]: ApFixture[] } = {};

  dataSource: MatTableDataSource<ApFixture>;

  selectedSportId: number = 0;
  supportedSports = ['Soccer', 'Tennis'];

  selectLeaguesCtrl = new FormControl('');
  selectedLeagues: ApLeague[] = [];

  filteredLeagues: Observable<ApLeague[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  displayedColumns: string[] = ['id', 'starts', 'home', 'away'];

  @ViewChild('selectLeaguesInput')
  selectLeaguesInput: ElementRef<HTMLInputElement>;

  constructor(private fixturesService: FixturesService) {
    this.filteredLeagues = this.selectLeaguesCtrl.valueChanges.pipe(
      startWith(null),
      map((league: string | null) =>
        league ? this._filter(league) : this.leagues.slice()
      )
    );
  }

  ngOnInit(): void {
    this.fixturesService.getSports().subscribe((r) => {
      this.sports = r.filter((s) => this.supportedSports.includes(s.name));
      this.selectedSportId = this.sports.length > 0 ? this.sports[0].id : 0;
      this.onSportIdChanged();
    });
  }

  onSportIdChanged() {
    console.log('selectedSportId: ', this.selectedSportId);
    this.fixturesService
      .getLeaguesForSport(this.selectedSportId)
      .subscribe((r) => {
        this.leagues = r;
        this.fixtures = [];
      });
  }

  addLeague(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const league = this.leagues.filter((l) => l.name === value).pop();
      if (league !== undefined) {
        this.selectedLeagues.push(league);
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.selectLeaguesCtrl.setValue(null);
  }

  removeLeague(league: ApLeague): void {
    const index = this.selectedLeagues.map((l) => l.name).indexOf(league?.name);

    if (index >= 0) {
      this.selectedLeagues.splice(index, 1);
    }
  }

  leagueSelected(event: MatAutocompleteSelectedEvent): void {
    const leagueName = event.option.viewValue;
    if (leagueName) {
      const league = this.leagues.filter((l) => l.name === leagueName).at(0);
      if (league !== undefined) {
        this.selectedLeagues.push(league);
      }
    }

    this.selectLeaguesInput.nativeElement.value = '';
    this.selectLeaguesCtrl.setValue(null);
  }

  showNextFixtures() {
    if (!this.selectedSportId || !this.selectedLeagues.length) {
      console.log('No leagues selected!');
      return;
    }
    const leagueIds = this.selectedLeagues.map((l) => l.id);
    this.fixturesService
      .getFutureEventsForLeagues(this.selectedSportId, leagueIds)
      .subscribe((r) => {
        this.fixtures = r;

        const source = from(r);
        source
          .pipe(
            groupBy((item) =>
              moment(item?.starts).format(moment.HTML5_FMT.DATE)
            ),
            mergeMap((group) =>
              zip(
                of(group.key),
                group.pipe(
                  toArray(),
                  map((fixtures) =>
                    fixtures.sort(
                      (f1, f2) =>
                        new Date(f1.starts).getTime() -
                        new Date(f2.starts).getTime()
                    )
                  )
                )
              )
            )
          )
          .subscribe((r) => {
            this.fixturesByDay[r[0]] = r[1];
          });
      });
  }

  private _filter(value: string): ApLeague[] {
    const filterValue = value.toLowerCase();

    return this.leagues.filter((league) =>
      league?.name.toLowerCase().includes(filterValue)
    );
  }
}
