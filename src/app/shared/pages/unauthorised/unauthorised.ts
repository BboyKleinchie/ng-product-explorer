import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../../components/card/card';

@Component({
  selector: 'pe-unauthorised',
  imports: [CardComponent],
  templateUrl: './unauthorised.html',
  styleUrl: './unauthorised.scss',
})
export class Unauthorised {
  private router = inject(Router);

  goHome() { this.router.navigate(['/'])};
}
