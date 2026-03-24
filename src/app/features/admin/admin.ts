import { Component, effect, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth';

@Component({
  selector: 'pe-admin',
  imports: [
    CardComponent
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (!this.authService.authenticated$()) { this.goHome(); }
    })
  }

  goHome() { this.router.navigate(['/'])};
}
