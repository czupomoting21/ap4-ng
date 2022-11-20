import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { ApTeamCount } from '../_model/ap-team-count';
import { LeaguesService } from '../_service/leagues.service';

// <input
// type="number"
// [(ngModel)]="value"
// #input
// style="width: 100%"
// />`

@Component({
  selector: 'editor-cell',
  template: `
  <div>
    <mat-form-field>
      <mat-select [(ngModel)]="value" >
        <mat-option *ngFor="let t of teams" [value]="t.team">{{t.team}} ({{t.c}})</mat-option>
      </mat-select>
    </mat-form-field>
    <button mat-button (click)="clearValue()" color="warn" style="min-width: 32px;">X</button>
  </div>
  `,
})
export class AgTeamEditorComponent implements ICellEditorAngularComp {
  
  private params!: ICellEditorParams;
  public value!: string|null;
  public teams: ApTeamCount[] = [];

  constructor(private leaguesService: LeaguesService) {
    leaguesService.getTeamNames(2374).subscribe(r => {
      this.teams = r;
    });
  }

  agInit(params: ICellEditorParams<any, any>): void {
    this.params = params;

    this.value = this.params.value;
  }

  getValue() {
    return this.value;
  }

  isPopup(): boolean {
    return true;
  }

  clearValue() {
    this.value = null;
  }

}
