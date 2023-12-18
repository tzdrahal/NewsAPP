import { TestBed } from '@angular/core/testing';

import { NewsModelTsService } from './news.model.ts.service';

describe('NewsModelTsService', () => {
  let service: NewsModelTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsModelTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
