import { Component, OnInit } from '@angular/core';
import { ColDef, NewValueParams } from 'ag-grid-community';
import { AgTeamEditorComponent } from '../ag-team-editor/ag-team-editor.component';
import { SLeague } from '../_model/stats/s-league';
import { STeam } from '../_model/stats/s-team';
import { StatsService } from '../_service/stats.service';

@Component({
  selector: 'app-stats-teams',
  templateUrl: './stats-teams.component.html',
  styleUrls: ['./stats-teams.component.scss']
})
export class StatsTeamsComponent implements OnInit {

  selectedLeague: SLeague|undefined;
  leagues: SLeague[] = [];
  teams: STeam[] = [];

  columnDefs: ColDef[] = [];

  constructor(private statsService: StatsService) {
    const onCellValueChanged = (event: NewValueParams<any>) => this.updateTeam(statsService, event);
    this.columnDefs = [
      { field: 'id' },
      { field: 'fdcoukName' },
      { field: 'apName1', cellEditor: AgTeamEditorComponent, cellEditorPopup: true, editable: true, onCellValueChanged: onCellValueChanged },
      { field: 'apName2', cellEditor: AgTeamEditorComponent, cellEditorPopup: true, editable: true, onCellValueChanged: onCellValueChanged },
      { field: 'apName3', cellEditor: AgTeamEditorComponent, cellEditorPopup: true, editable: true, onCellValueChanged: onCellValueChanged }
    ]

   }

  ngOnInit(): void {
    this.statsService.getLeagues().subscribe(r => {
      this.leagues = r;
    });

    this.statsService.getAllTeams().subscribe(r => {
      this.teams = r;
    })


  }

  onLeagueSelected(l: SLeague){
    this.selectedLeague = l;
  }

  updateTeam(statsService: StatsService, event: NewValueParams<any>){
    if(event.newValue != event.oldValue){
      console.log('updateTeam', event);
      statsService.updateTeam(event.data).subscribe();
    }
  }
}
