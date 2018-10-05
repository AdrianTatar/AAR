import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KunAddDialogComponent } from './kun-add-dialog.component';

describe('KunAddDialogComponent', () => {
  let component: KunAddDialogComponent;
  let fixture: ComponentFixture<KunAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KunAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KunAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
