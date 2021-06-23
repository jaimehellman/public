import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridviewInMemoryComponent } from './gridview-in-memory.component';

describe('GridviewInMemoryComponent', () => {
  let component: GridviewInMemoryComponent;
  let fixture: ComponentFixture<GridviewInMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridviewInMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridviewInMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
