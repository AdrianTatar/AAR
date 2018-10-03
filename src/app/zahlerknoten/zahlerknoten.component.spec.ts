import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahlerknotenComponent } from './zahlerknoten.component';

describe('ZahlerknotenComponent', () => {
  let component: ZahlerknotenComponent;
  let fixture: ComponentFixture<ZahlerknotenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZahlerknotenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahlerknotenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
