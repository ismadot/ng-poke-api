import { TestBed } from '@angular/core/testing';

import { PocketMonsterService } from './pocket-monster.service';

describe('PocketMonsterService', () => {
  let service: PocketMonsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketMonsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
