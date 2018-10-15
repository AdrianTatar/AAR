import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnAddDialogComponent } from './pn-add-dialog.component';

describe('PnAddDialogComponent', () => {
  let component: PnAddDialogComponent;
  let fixture: ComponentFixture<PnAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
