import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import 'chartjs-adapter-moment';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { FixturesService } from '../_service/fixtures.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApOddsMoneylineExt } from '../_model/ap-odds-moneyline-ext';
import zoomPlugin from 'chartjs-plugin-zoom';

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
    Chart.register(zoomPlugin);
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
          backgroundColor: 'rgba(255,0,0,0.7)',
          borderColor: 'rgba(255,0,0,0.7)',
          // pointBackgroundColor: 'rgba(148,159,177,1)',
          // pointBorderColor: '#fff',
          // pointHoverBackgroundColor: '#fff',
          // pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          // fill: 'origin',
        },
        {
          data: this.awayOdds,
          label: 'Away',
          backgroundColor: 'rgba(0,0,255,0.7)',
          borderColor: 'rgba(0,0,255,0.7)',
          //   pointBackgroundColor: 'rgba(77,83,96,1)',
          //   pointBorderColor: '#fff',
          //   pointHoverBackgroundColor: '#fff',
          //   pointHoverBorderColor: 'rgba(77,83,96,1)',
          //   fill: 'origin',
        },
        {
          data: this.drawOdds,
          label: 'Draw',
          backgroundColor: 'rgba(0,255,0,0.7)',
          borderColor: 'rgba(0,255,0,0.7)',
          //   pointBackgroundColor: 'rgba(148,159,177,1)',
          //   pointBorderColor: '#fff',
          //   pointHoverBackgroundColor: '#fff',
          //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          //   fill: 'origin',
        },
      ],
    };
  }

  public lineChartOptions: any = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            hour: 'HH:mm',
            day: 'YYYY-MM-DD',
          },
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
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
