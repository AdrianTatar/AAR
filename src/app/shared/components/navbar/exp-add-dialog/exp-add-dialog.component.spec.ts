import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpAddDialogComponent } from './exp-add-dialog.component';

describe('ExpAddDialogComponent', () => {
  let component: ExpAddDialogComponent;
  let fixture: ComponentFixture<ExpAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
