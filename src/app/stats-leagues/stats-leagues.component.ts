import { Component, OnInit } from '@angular/core';
import { SLeague } from '../_model/stats/s-league';
import { StatsService } from '../_service/stats.service';

@Component({
  selector: 'app-stats-leagues',
  templateUrl: './stats-leagues.component.html',
  styleUrls: ['./stats-leagues.component.scss']
})
export class StatsLeaguesComponent implements OnInit {

  leagues: SLeague[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getLeagues().subscribe( r => this.leagues = r);
  }

}
