import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurchargeCustomersComponent } from './surcharge-customers.component';

describe('SurchargeCustomersComponent', () => {
  let component: SurchargeCustomersComponent;
  let fixture: ComponentFixture<SurchargeCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurchargeCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurchargeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
