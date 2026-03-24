import { computed, effect, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from '../services/product-api.ts';
import { isArrayNullOrEmpty } from '../../../shared/utils/isEmptyChecks.utils';
import { Store } from '../../../core/store';

@Injectable({ providedIn: 'root' })
export class ProductStore extends Store implements OnDestroy {
  private products = signal<Product[]>([]);

  private productService = inject(ProductService);
  private readonly destroyed$ = new Subject<void>();

  readonly products$ = computed(() => {
    if (isArrayNullOrEmpty(this.products())) {
      return [] as Product[];
    }

    return this.products();
  });
  readonly hasProducts = computed(() => !isArrayNullOrEmpty(this.products()));

  constructor() {
    super();
    effect(() => {
      if (this.isLoaded() || this.isLoading()) { return; }
      this.loadProducts();
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public override refresh(): void { super.refresh(); }

  private loadProducts() {
    if (this.isLoaded() || this.isLoading$()) { return; }

    this.isLoading.set(true);

    this.productService
        .listProducts()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (products) => {
            this.products.set(products);
            this.isLoaded.set(true);
            this.isLoading.set(false);
          },
          error: () => this.isLoading.set(false),
        });
  }
}
