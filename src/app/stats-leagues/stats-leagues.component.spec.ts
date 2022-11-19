import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsLeaguesComponent } from './stats-leagues.component';

describe('StatsLeaguesComponent', () => {
  let component: StatsLeaguesComponent;
  let fixture: ComponentFixture<StatsLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsLeaguesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
