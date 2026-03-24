import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { RatingComponent } from './../rating/rating';
import { VerticalCardComponent } from './../../../../shared/components/card/vertical-card/vertical-card';

import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'pe-product-card',
  imports: [
    RatingComponent,
    VerticalCardComponent,
    CurrencyPipe
],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  selected = output<Product>();
}
