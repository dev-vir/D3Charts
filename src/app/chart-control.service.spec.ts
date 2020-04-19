import { TestBed } from '@angular/core/testing';

import { ChartControlService } from './chart-controls.service';

describe('ChartControlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartControlService = TestBed.get(ChartControlService);
    expect(service).toBeTruthy();
  });
})
