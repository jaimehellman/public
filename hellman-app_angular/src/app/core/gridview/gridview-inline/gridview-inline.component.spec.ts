import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridviewInlineComponent } from './gridview-inline.component';

describe('GridviewInlineComponent', () => {
  let component: GridviewInlineComponent;
  let fixture: ComponentFixture<GridviewInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridviewInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridviewInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
