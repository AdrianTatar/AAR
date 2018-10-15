import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerNodesComponent } from './payernodes.component';

describe('PayerNodesComponent', () => {
  let component: PayerNodesComponent;
  let fixture: ComponentFixture<PayerNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
