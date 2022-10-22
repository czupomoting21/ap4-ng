import { ApOddsMoneyline } from './ap-odds-moneyline';

export interface ApOddsMoneylineExt extends ApOddsMoneyline {
  lineId: number;
  cutoff: Date;
  status: number;
  maxSpread: number;
  maxMoneyline: number;
  maxTotal: number;
  maxTeamTotal: number;
  homeScore: number;
  awayScore: number;
  homeRedCards: number;
  awayRedCards: number;
  created: Date;
}
