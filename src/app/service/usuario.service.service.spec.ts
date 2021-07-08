import { TestBed } from '@angular/core/testing';

import { Usuario.ServiceService } from './usuario.service.service';

describe('Usuario.ServiceService', () => {
  let service: Usuario.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usuario.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
