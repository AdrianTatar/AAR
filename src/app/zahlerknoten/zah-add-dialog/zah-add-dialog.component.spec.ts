import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahAddDialogComponent } from './zah-add-dialog.component';

describe('ZahAddDialogComponent', () => {
  let component: ZahAddDialogComponent;
  let fixture: ComponentFixture<ZahAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZahAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
