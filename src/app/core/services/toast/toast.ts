import { Injectable, signal } from '@angular/core';
import { Toast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toasts = signal<Toast[]>([]);
  readonly toasts$ = this.toasts.asReadonly();

	show(toast: Toast) {
		this.toasts.update((toasts) => [...toasts, toast]);

    if (toast?.delay) {
      setTimeout(() => {
        this.remove(toast);
      }, (toast.delay + 100));
    }
	}

	remove(toast: Toast) {
		this.toasts.update((toasts) => toasts.filter((t) => t !== toast));
	}

	clear() {
		this.toasts.set([]);
	}
}
