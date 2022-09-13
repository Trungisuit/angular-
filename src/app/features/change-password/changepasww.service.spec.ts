import { TestBed } from '@angular/core/testing';

import { ChangepaswwService } from './changepasww.service';

describe('ChangepaswwService', () => {
  let service: ChangepaswwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepaswwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
