import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationTravailComponent } from './attestation-travail.component';

describe('AttestationTravailComponent', () => {
  let component: AttestationTravailComponent;
  let fixture: ComponentFixture<AttestationTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttestationTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
