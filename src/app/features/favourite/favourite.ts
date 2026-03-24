import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { FavouritesService } from './../../core/services/favourites/favourites';
import { Product } from '../../shared/models/product.model';
import { NoProductsCardComponent } from '../../shared/components/card/no-products-card/no-products-card';
import { ProductCardComponent } from '../../shared/components/card/product-card/product-card';
import { ProductStore } from '../../core/stores/product-store';
import { isArrayNullOrEmpty } from '../../shared/utils/isEmptyChecks.utils';

@Component({
  selector: 'pe-favourite',
  imports: [
    NoProductsCardComponent,
    ProductCardComponent
  ],
  templateUrl: './favourite.html',
  styleUrl: './favourite.scss',
})
export class Favourite implements OnInit {
  private products = signal<Product[]>([]);

  products$ = this.products.asReadonly();
  hasFavouriteProducts = computed(() => !isArrayNullOrEmpty(this.products$()));

  store = inject(ProductStore);
  private favouritesService = inject(FavouritesService);
  private router = inject(Router);

  ngOnInit() {
    this.loadFavouriteProducts();
  }

  loadFavouriteProducts() {
    const favouriteProductIds = this.favouritesService.retrieveProductIdsFromLocalStorage();
    const favouriteProducts = this.store
                                  .products$()
                                  .filter((product) => favouriteProductIds.includes(product.id.toString()));

    this.products.set(favouriteProducts);
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['product-details', product.id]);
  }
}
