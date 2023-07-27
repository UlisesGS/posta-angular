import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosEmpresariosComponent } from './procesos-empresarios.component';

describe('ProcesosEmpresariosComponent', () => {
  let component: ProcesosEmpresariosComponent;
  let fixture: ComponentFixture<ProcesosEmpresariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesosEmpresariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesosEmpresariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
