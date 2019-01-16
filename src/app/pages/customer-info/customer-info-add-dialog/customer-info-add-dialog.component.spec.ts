import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoAddDialogComponent } from './customer-info-add-dialog.component';

describe('CustomerInfoAddDialogComponent', () => {
  let component: CustomerInfoAddDialogComponent;
  let fixture: ComponentFixture<CustomerInfoAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInfoAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInfoAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
