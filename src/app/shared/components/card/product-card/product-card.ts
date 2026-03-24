import { STORAGE_KEY } from './../../../constants/storage.constants';
import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { MaterialIconComponent } from '../../material-icon/material-icon';
import { RatingComponent } from '../../rating/rating';
import { VerticalCardComponent } from './../../../../shared/components/card/vertical-card/vertical-card';

import { Product } from '../../../../shared/models/product.model';
import { isStringNullOrEmpty } from '../../../utils/isEmptyChecks.utils';
import { FavouritesService } from '../../../../core/services/favourites/favourites';

@Component({
  selector: 'pe-product-card',
  imports: [
    MaterialIconComponent,
    RatingComponent,
    VerticalCardComponent,
    CurrencyPipe
],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent implements OnInit {
  product = input.required<Product>();
  selected = output<Product>();
  favouriteChanged = output();

  isMarkedAsFavourite = signal<boolean>(false);
  private readonly favouritesService = inject(FavouritesService);

  constructor() {
    effect(() => {
      const productId = this.product().id.toString();

      if (this.isMarkedAsFavourite()) {
        this.markProductAsFavourite(productId);
      } else {
        this.unmarkProductAsFavourite(productId);
      }
    })
  }

  ngOnInit(): void {
    this.checkIfProductMarkedAsFavourite();
  }

  toggleFavourite() {
    this.isMarkedAsFavourite.update((flag) => !flag);
  }

  private checkIfProductMarkedAsFavourite() {
    const productIds = this.favouritesService.retrieveProductIdsFromLocalStorage();

    if (productIds.find(p => p === this.product().id.toString())) {
      this.isMarkedAsFavourite.set(true);
    }
  }

  private markProductAsFavourite(productId: string) {
    const productIds = this.favouritesService.retrieveProductIdsFromLocalStorage();
    localStorage.removeItem(STORAGE_KEY.favouriteProducts);

    productIds.push(productId);

    localStorage.setItem(STORAGE_KEY.favouriteProducts, JSON.stringify(productIds));
    this.favouriteChanged.emit();
  }

  private unmarkProductAsFavourite(productId: string) {
    const productIds = this.favouritesService.retrieveProductIdsFromLocalStorage();
    const productIndex = productIds.findIndex(p => p === productId);

    if (productIndex === -1) return;

    localStorage.removeItem(STORAGE_KEY.favouriteProducts);

    productIds.splice(productIndex, 1);

    localStorage.setItem(STORAGE_KEY.favouriteProducts, JSON.stringify(productIds));
    this.favouriteChanged.emit();
  }
}
