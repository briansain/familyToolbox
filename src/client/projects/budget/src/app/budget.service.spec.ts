import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetService = TestBed.get(BudgetService);
    expect(service).toBeTruthy();
  });
});
