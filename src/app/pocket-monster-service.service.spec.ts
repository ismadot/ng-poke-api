import { TestBed } from '@angular/core/testing';

import { PocketMonsterServiceService } from './pocket-monster-service.service';

describe('PocketMonsterServiceService', () => {
  let service: PocketMonsterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketMonsterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
