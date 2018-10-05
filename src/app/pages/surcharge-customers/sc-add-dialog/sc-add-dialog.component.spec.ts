import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAddDialogComponent } from './sc-add-dialog.component';

describe('ScAddDialogComponent', () => {
  let component: ScAddDialogComponent;
  let fixture: ComponentFixture<ScAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
