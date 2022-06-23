import { TestBed } from '@angular/core/testing';

import { LastsavedService } from './lastsaved.service';

describe('LastsavedService', () => {
  let service: LastsavedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastsavedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
