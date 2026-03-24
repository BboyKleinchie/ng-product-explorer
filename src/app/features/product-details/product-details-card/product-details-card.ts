import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ProductStore } from '../../../core/stores/product-store';
import { CardComponent } from '../../../shared/components/card/card';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { RatingComponent } from '../../catalog/components/rating/rating';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'pe-product-details-card',
  imports: [
    CardComponent,
    LoadingSpinnerComponent,
    RatingComponent,
    // InfoModalComponent,
    CurrencyPipe
  ],
  templateUrl: './product-details-card.html',
  styleUrl: './product-details-card.scss'
})
export class ProductDetailsCardComponent {
  productDetails = input.required<Product | null>();

  store = inject(ProductStore);
  private router = inject(Router);

  goHome() { this.router.navigate(['/']); }
}
