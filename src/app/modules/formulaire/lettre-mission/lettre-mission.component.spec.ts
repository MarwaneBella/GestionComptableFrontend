import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettreMissionComponent } from './lettre-mission.component';

describe('LettreMissionComponent', () => {
  let component: LettreMissionComponent;
  let fixture: ComponentFixture<LettreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LettreMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LettreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
