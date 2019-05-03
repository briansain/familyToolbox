import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAllComponent } from './budget-all.component';

describe('BudgetAllComponent', () => {
  let component: BudgetAllComponent;
  let fixture: ComponentFixture<BudgetAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
