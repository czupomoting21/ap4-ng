import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixtureListComponent } from './fixture-list/fixture-list.component';
import { HomeComponent } from './home/home.component';
import { StatsLeaguesComponent } from './stats-leagues/stats-leagues.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'fixtures', component: FixtureListComponent },
  { path: 'stats/leagues', component: StatsLeaguesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
