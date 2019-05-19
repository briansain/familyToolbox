import { TestBed } from '@angular/core/testing';

import { DeepCopyService } from './deep-copy.service';

describe('DeepCopyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeepCopyService = TestBed.get(DeepCopyService);
    expect(service).toBeTruthy();
  });
});
