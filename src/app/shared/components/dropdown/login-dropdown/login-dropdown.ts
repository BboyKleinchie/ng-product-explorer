import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	NgbDropdown,
	NgbDropdownToggle,
	NgbDropdownMenu
} from '@ng-bootstrap/ng-bootstrap/dropdown';

import { FormFieldComponent } from '../../form-field/form-field';
import { PasswordInputComponent } from '../../password-input/password-input';
import { STORAGE_KEY } from '../../../constants/storage.constants';
import { AuthService } from '../../../../core/services/auth/auth';

@Component({
  selector: 'pe-login-dropdown',
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    FormsModule,
    ReactiveFormsModule,
    FormFieldComponent,
    PasswordInputComponent
  ],
  templateUrl: './login-dropdown.html',
  styleUrl: './login-dropdown.scss',
})
export class LoginDropdownComponent {
  loginForm: FormGroup;
  isPasswordVisible = signal<boolean>(false);

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.loginForm = this.createForm();
  }

  onSignIn(event: MouseEvent) {
    event?.preventDefault();
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return;

    this.authService.signIn();
  }

  private createForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
