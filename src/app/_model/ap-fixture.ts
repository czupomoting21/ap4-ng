export interface ApFixture {
  apId: number;
  id: number;
  leagueId: number;
  parentId: number;
  starts: Date;
  home: string;
  away: string;
  rotNum: string;
  liveStatus: number;
  homePitcher: string;
  awayPitcher: string;
  status: string;
  betAcceptanceType: number;
  parlayRestriction: number;
  altTeaser: boolean;
  resultingUnit: string;
  version: number;

  leagueName: string;
  sportId: number;
  sportName: string;
}
