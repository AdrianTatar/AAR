import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbAddDialogComponent } from './cb-add-dialog.component';

describe('KunAddDialogComponent', () => {
  let component: CbAddDialogComponent;
  let fixture: ComponentFixture<CbAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
