import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import 'chartjs-adapter-moment';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { FixturesService } from '../_service/fixtures.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApOddsMoneylineExt } from '../_model/ap-odds-moneyline-ext';

@Component({
  selector: 'app-fixture-odds-history-modal',
  templateUrl: './fixture-odds-history-modal.component.html',
  styleUrls: ['./fixture-odds-history-modal.component.scss'],
})
export class FixtureOddsHistoryModalComponent implements OnInit {
  oddsHistory: ApOddsMoneylineExt[] = [];
  homeOdds: any[] = [];
  awayOdds: any[] = [];
  drawOdds: any[] = [];
  labels: string[] = [];
  lineChartData: ChartConfiguration['data'] | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public fixtureId: number,
    private fixturesService: FixturesService
  ) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.fixturesService
      .getMoneylineOddsHistoryForFixture(this.fixtureId)
      .subscribe((r) => this.prepareChartData(r));
  }

  private prepareChartData(moneyLineOddsHistory: ApOddsMoneylineExt[]) {
    this.oddsHistory = moneyLineOddsHistory;

    this.homeOdds = moneyLineOddsHistory.map((o) => {
      return {
        // x: moment(o.created),
        x: o.created,
        // x: new Date(o.created).toLocaleDateString(),
        y: o.home,
      };
    });
    this.awayOdds = moneyLineOddsHistory.map((o) => {
      return { x: moment(o.created), y: o.away };
    });
    this.drawOdds = moneyLineOddsHistory.map((o) => {
      return { x: moment(o.created), y: o.draw };
    });

    this.lineChartData = {
      datasets: [
        {
          data: this.homeOdds,
          label: 'Home',
          // backgroundColor: 'rgba(148,159,177,0.2)',
          // borderColor: 'rgba(148,159,177,1)',
          // pointBackgroundColor: 'rgba(148,159,177,1)',
          // pointBorderColor: '#fff',
          // pointHoverBackgroundColor: '#fff',
          // pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          // fill: 'origin',
        },
        // {
        //   data: this.awayOdds,
        //   label: 'Away',
        //   backgroundColor: 'rgba(77,83,96,0.2)',
        //   borderColor: 'rgba(77,83,96,1)',
        //   pointBackgroundColor: 'rgba(77,83,96,1)',
        //   pointBorderColor: '#fff',
        //   pointHoverBackgroundColor: '#fff',
        //   pointHoverBorderColor: 'rgba(77,83,96,1)',
        //   fill: 'origin',
        // },
        // {
        //   data: this.drawOdds,
        //   label: 'Draw',
        //   backgroundColor: 'rgba(255,0,0,0.3)',
        //   borderColor: 'red',
        //   pointBackgroundColor: 'rgba(148,159,177,1)',
        //   pointBorderColor: '#fff',
        //   pointHoverBackgroundColor: '#fff',
        //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //   fill: 'origin',
        // },
      ],
    };
  }

  public lineChartOptions: any = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'hour',
            displayFormats: {
              hour: 'HH a',
            },
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Hour',
          },
        },
      ],
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }
}
