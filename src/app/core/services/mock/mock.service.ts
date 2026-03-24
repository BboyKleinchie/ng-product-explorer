import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockService {
  // TODO: remove if not needed
  // public shouldReturnMock = (mockName: string): boolean => get(environment.mock, mockName, false);

  public returnMockData<T>(mockName: string): T | null {
    try {
      return require(`../../../../assets/json/${mockName}.json`) as T;
    }
    catch {
      return null;
    }
  }
}
