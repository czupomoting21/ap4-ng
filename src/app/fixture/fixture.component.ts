import { Component, Input, OnInit } from '@angular/core';
import { ApFixture } from '../_model/ap-fixture';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  @Input()
  fixture: ApFixture;

  constructor() {}

  ngOnInit(): void {}
}
