import { TestBed } from '@angular/core/testing';

import { ClientManagementServiceClient } from './client-management.service.client';

describe('ClientManagementServiceService', () => {
  let service: ClientManagementServiceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientManagementServiceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
