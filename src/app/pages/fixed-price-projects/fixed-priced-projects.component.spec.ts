import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPriceProjectsComponent } from './fixed-price-projects.component';

describe('FixedPriceProjectsComponent', () => {
  let component: FixedPriceProjectsComponent;
  let fixture: ComponentFixture<FixedPriceProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedPriceProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPriceProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
