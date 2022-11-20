import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTeamsComponent } from './stats-teams.component';

describe('StatsTeamsComponent', () => {
  let component: StatsTeamsComponent;
  let fixture: ComponentFixture<StatsTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
