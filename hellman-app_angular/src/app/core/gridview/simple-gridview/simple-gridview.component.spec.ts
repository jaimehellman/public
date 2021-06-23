import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGridviewComponent } from './simple-gridview.component';

describe('SimpleGridviewComponent', () => {
  let component: SimpleGridviewComponent;
  let fixture: ComponentFixture<SimpleGridviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGridviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
