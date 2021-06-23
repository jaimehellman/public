import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombotreegridComponent } from './combotreegrid.component';

describe('CombotreegridComponent', () => {
  let component: CombotreegridComponent;
  let fixture: ComponentFixture<CombotreegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombotreegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombotreegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
