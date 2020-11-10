import { TestBed } from '@angular/core/testing';

import { ClientManagementService } from './client-management.service';

describe('ClientManagementServiceService', () => {
  let service: ClientManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
