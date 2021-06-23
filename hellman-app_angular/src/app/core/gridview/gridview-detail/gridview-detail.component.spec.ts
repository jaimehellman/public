import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridviewDetailComponent } from './gridview-detail.component';

describe('GridviewDetailComponent', () => {
  let component: GridviewDetailComponent;
  let fixture: ComponentFixture<GridviewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridviewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
