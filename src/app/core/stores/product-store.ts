import { computed, effect, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../core/services/product/product-api.ts';
import { isArrayNullOrEmpty, isPropertyNull } from '../../shared/utils/isEmptyChecks.utils';
import { Store } from '../../core/store';

@Injectable({ providedIn: 'root' })
export class ProductStore extends Store implements OnDestroy {
  private products = signal<Product[]>([]);
  private productDetails = signal<Product | null>(null);

  private productService = inject(ProductService);
  private readonly destroyed$ = new Subject<void>();

  readonly products$ = computed(() => {
    if (isArrayNullOrEmpty(this.products())) {
      return [] as Product[];
    }

    return this.products();
  });
  readonly productDetails$ = this.productDetails.asReadonly();

  readonly hasProducts = computed(() => !isArrayNullOrEmpty(this.products()));
  readonly hasProductDetails = computed(() => !isPropertyNull(this.productDetails$()));

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

  public getProductDetails(productId: string) {
    // realworld we'll call the product service which will get the details from an http get request
    this.productDetails.set(this.products$().find(p => p.id.toString() === productId) || null);
  }

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
