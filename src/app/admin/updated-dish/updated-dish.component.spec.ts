import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedDishComponent } from './updated-dish.component';

describe('UpdatedDishComponent', () => {
  let component: UpdatedDishComponent;
  let fixture: ComponentFixture<UpdatedDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
