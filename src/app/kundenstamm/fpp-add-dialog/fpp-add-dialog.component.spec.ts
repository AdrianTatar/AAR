import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FppAddDialogComponent } from './fpp-add-dialog.component';

describe('FppAddDialogComponent', () => {
  let component: FppAddDialogComponent;
  let fixture: ComponentFixture<FppAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FppAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FppAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
