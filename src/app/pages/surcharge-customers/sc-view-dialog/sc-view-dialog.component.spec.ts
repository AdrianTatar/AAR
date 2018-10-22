import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScViewDialogComponent } from './sc-view-dialog.component';

describe('ScViewDialogComponent', () => {
  let component: ScViewDialogComponent;
  let fixture: ComponentFixture<ScViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
