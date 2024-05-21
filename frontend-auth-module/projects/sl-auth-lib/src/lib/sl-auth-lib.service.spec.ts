import { TestBed } from '@angular/core/testing';

import { SlAuthLibService } from './sl-auth-lib.service';

describe('SlAuthLibService', () => {
  let service: SlAuthLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlAuthLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
