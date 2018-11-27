import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportActionsComponent } from './export-actions.component';

describe('ExportActionsComponent', () => {
  let component: ExportActionsComponent;
  let fixture: ComponentFixture<ExportActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
