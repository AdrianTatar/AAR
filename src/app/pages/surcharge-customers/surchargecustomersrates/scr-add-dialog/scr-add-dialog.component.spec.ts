import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrAddDialogComponent } from './scr-add-dialog.component';

describe('ScAddDialogComponent', () => {
  let component: ScrAddDialogComponent;
  let fixture: ComponentFixture<ScrAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
