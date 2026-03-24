import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductStore } from '../../core/stores/product/product-store';

import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';
import { NoProductsCardComponent } from '../../shared/components/card/no-products-card/no-products-card';
import { ProductDetailsCardComponent } from './product-details-card/product-details-card';

@Component({
  selector: 'pe-product-details',
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    NoProductsCardComponent,
    ProductDetailsCardComponent
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  productId = input.required<string>();

  store = inject(ProductStore);
  private router = inject(Router);

  ngOnInit(): void {
    this.store.getProductDetails(this.productId());
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
