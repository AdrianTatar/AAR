import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScEditDialogComponent } from './sc-edit-dialog.component';

describe('ScEditDialogComponent', () => {
  let component: ScEditDialogComponent;
  let fixture: ComponentFixture<ScEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
