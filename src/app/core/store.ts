import { signal } from '@angular/core';

export abstract class Store {
  protected isLoaded = signal<boolean>(false);
  protected isLoading = signal<boolean>(false);
  readonly isLoading$ = this.isLoading.asReadonly();

  public refresh() {
    this.isLoaded.set(false);
    this.isLoading.set(false);
  }
}
