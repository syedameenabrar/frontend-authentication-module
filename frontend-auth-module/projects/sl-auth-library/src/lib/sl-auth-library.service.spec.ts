import { TestBed } from '@angular/core/testing';

import { SlAuthLibraryService } from './sl-auth-library.service';

describe('SlAuthLibraryService', () => {
  let service: SlAuthLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlAuthLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
