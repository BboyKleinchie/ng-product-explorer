import { Component, inject, input, OnInit, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { MaterialIconComponent } from '../../material-icon/material-icon';
import { RatingComponent } from '../../rating/rating';
import { VerticalCardComponent } from './../../../../shared/components/card/vertical-card/vertical-card';

import { Product } from '../../../../shared/models/product.model';
import { ToastService } from '../../../../core/services/toast/toast';
import { FavouritesService } from '../../../../core/services/favourites/favourites';
import { STORAGE_KEY } from './../../../constants/storage.constants';

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

  @ViewChild('toastMarkFavouriteSuccess')
  private toastMarkFavouriteSuccessTemplate!: TemplateRef<any>;
  @ViewChild('toastUnmarkFavouriteSuccess')
  private toastUnmarkFavouriteSuccessTemplate!: TemplateRef<any>;

  private readonly favouritesService = inject(FavouritesService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.checkIfProductMarkedAsFavourite();
  }

  toggleFavourite() {
    this.isMarkedAsFavourite.update((flag) => !flag);

    const productId = this.product().id.toString();

    if (this.isMarkedAsFavourite()) {
      this.markProductAsFavourite(productId);
    } else {
      this.unmarkProductAsFavourite(productId);
    }
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
    this.toastService.show({ template: this.toastMarkFavouriteSuccessTemplate, classname: 'bg-success text-light', delay: 4000 });
  }

  private unmarkProductAsFavourite(productId: string) {
    const productIds = this.favouritesService.retrieveProductIdsFromLocalStorage();
    const productIndex = productIds.findIndex(p => p === productId);

    if (productIndex === -1) return;

    localStorage.removeItem(STORAGE_KEY.favouriteProducts);

    productIds.splice(productIndex, 1);

    localStorage.setItem(STORAGE_KEY.favouriteProducts, JSON.stringify(productIds));
    this.favouriteChanged.emit();
    this.toastService.show({ template: this.toastUnmarkFavouriteSuccessTemplate, classname: 'bg-success text-light', delay: 4000 });
  }
}
