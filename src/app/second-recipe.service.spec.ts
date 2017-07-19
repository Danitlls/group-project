import { TestBed, inject } from '@angular/core/testing';

import { SecondRecipeService } from './second-recipe.service';

describe('SecondRecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecondRecipeService]
    });
  });

  it('should ...', inject([SecondRecipeService], (service: SecondRecipeService) => {
    expect(service).toBeTruthy();
  }));
});
