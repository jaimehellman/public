import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosearchComponent } from './combosearch.component';

describe('CombosearchComponent', () => {
  let component: CombosearchComponent;
  let fixture: ComponentFixture<CombosearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombosearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
