import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPricedProjectsComponent } from './fixed-priced-projects.component';

describe('FixedPricedProjectsComponent', () => {
  let component: FixedPricedProjectsComponent;
  let fixture: ComponentFixture<FixedPricedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedPricedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPricedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
