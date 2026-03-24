import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // this is all just to simulated being signed-in for "tech assessment" purposes
  private authenticated = signal<boolean>(false);

  readonly authenticated$ = this.authenticated.asReadonly();

  signIn() { this.authenticated.set(true); }
  signOut() { this.authenticated.set(false); }
}
