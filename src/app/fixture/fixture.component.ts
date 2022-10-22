import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApFixture } from '../_model/ap-fixture';
import { FixtureOddsHistoryModalComponent } from '../fixture-odds-history-modal/fixture-odds-history-modal.component';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  @Input()
  fixture: ApFixture | undefined;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  showOddsHistory() {
    console.log('showOddsHistory');

    const dialogRef = this.dialog.open(FixtureOddsHistoryModalComponent, {
      data: this.fixture?.id,
    });
  }
}
