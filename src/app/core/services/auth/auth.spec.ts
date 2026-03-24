import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be unauthenticated by default', () => {
    expect(service.authenticated$()).toBe(false);
  });

  it('should set authenticated to true on signIn', () => {
    service.signIn();

    expect(service.authenticated$()).toBe(true);
  });

  it('should set authenticated to false on signOut', () => {
    service.signIn();
    service.signOut();

    expect(service.authenticated$()).toBe(false);
  });

  it('should expose authenticated$ as readonly signal', () => {
    const authSignal = service.authenticated$;

    expect(typeof authSignal).toBe('function');
    expect(() => {
      (authSignal as any).set(true);
    }).toThrow();
  });
});
