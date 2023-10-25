import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCompletoComponent } from './ver-completo.component';

describe('VerCompletoComponent', () => {
  let component: VerCompletoComponent;
  let fixture: ComponentFixture<VerCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCompletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
