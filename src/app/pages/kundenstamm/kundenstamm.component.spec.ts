import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenstammComponent } from './kundenstamm.component';

describe('KundenstammComponent', () => {
  let component: KundenstammComponent;
  let fixture: ComponentFixture<KundenstammComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenstammComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenstammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
