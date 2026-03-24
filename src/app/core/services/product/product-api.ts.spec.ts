import { TestBed } from '@angular/core/testing';

import { ProductApiTs } from './product-api.ts';

describe('ProductApiTs', () => {
  let service: ProductApiTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApiTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
