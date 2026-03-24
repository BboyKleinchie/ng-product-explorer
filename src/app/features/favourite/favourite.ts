import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { FavouritesService } from './../../core/services/favourites/favourites';
import { Product } from '../../shared/models/product.model';
import { NoProductsCardComponent } from '../../shared/components/card/no-products-card/no-products-card';
import { ProductCardComponent } from '../../shared/components/card/product-card/product-card';
import { ProductStore } from '../../core/stores/product/product-store';
import { isArrayNullOrEmpty } from '../../shared/utils/isEmptyChecks.utils';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'pe-favourite',
  imports: [
    NoProductsCardComponent,
    ProductCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './favourite.html',
  styleUrl: './favourite.scss',
})
export class Favourite implements OnInit {
  private products = signal<Product[]>([]);

  products$ = this.products.asReadonly();
  hasFavouriteProducts = computed(() => !isArrayNullOrEmpty(this.products$()));
  isLoadingFavouriteProducts = signal<boolean>(false);

  store = inject(ProductStore);
  private favouritesService = inject(FavouritesService);
  private router = inject(Router);

  ngOnInit() {
    this.loadFavouriteProducts();
  }

  loadFavouriteProducts() {
    this.isLoadingFavouriteProducts.set(true);

    try {
      const favouriteProductIds = this.favouritesService.retrieveProductIdsFromLocalStorage();
      const favouriteProducts = this.store
                                    .products$()
                                    .filter((product) => favouriteProductIds.includes(product.id.toString()));

      this.products.set(favouriteProducts);
    } finally {
      this.isLoadingFavouriteProducts.set(false);
    }
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['product-details', product.id]);
  }
}
