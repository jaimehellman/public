import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEtapaComponent } from './grupo-etapa.component';

describe('GrupoEtapaComponent', () => {
  let component: GrupoEtapaComponent;
  let fixture: ComponentFixture<GrupoEtapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoEtapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
