import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApLeague } from '../_model/ap-league';
import { ApSport } from '../_model/ap-sport';
import { FixturesService } from '../_service/fixtures.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.scss'],
})
export class FixtureListComponent implements OnInit {
  sports: ApSport[] = [];
  leagues: ApLeague[] = [];

  selectedSportId: number = 0;
  supportedSports = ['Soccer', 'Tennis'];

  selectLeaguesCtrl = new FormControl('');
  selectedLeagues: ApLeague[] = [];

  filteredLeagues: Observable<ApLeague[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

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

  private _filter(value: string): ApLeague[] {
    const filterValue = value.toLowerCase();

    return this.leagues.filter((league) =>
      league?.name.toLowerCase().includes(filterValue)
    );
  }
}
