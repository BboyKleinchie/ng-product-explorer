import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LinkListComponent } from '../../../shared/components/link-list/link-list';
import { LoginDropdownComponent } from '../../../shared/components/dropdown/login-dropdown/login-dropdown';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'pe-header',
  imports: [
    RouterLink,
    LinkListComponent,
    LoginDropdownComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(AuthService);
}
