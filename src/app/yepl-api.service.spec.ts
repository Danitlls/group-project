import { TestBed, inject } from '@angular/core/testing';

import { YeplApiService } from './yepl-api.service';

describe('YeplApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YeplApiService]
    });
  });

  it('should ...', inject([YeplApiService], (service: YeplApiService) => {
    expect(service).toBeTruthy();
  }));
});
