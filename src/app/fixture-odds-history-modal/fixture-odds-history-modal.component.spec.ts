import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureOddsHistoryModalComponent } from './fixture-odds-history-modal.component';

describe('FixtureOddsHistoryModalComponent', () => {
  let component: FixtureOddsHistoryModalComponent;
  let fixture: ComponentFixture<FixtureOddsHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureOddsHistoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureOddsHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
