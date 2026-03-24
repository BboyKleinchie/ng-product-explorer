import { Component, computed, inject, signal } from '@angular/core';
import { startCase } from 'lodash-es';

import { ProductStore } from './stores/product-store';

import { DropdownComponent } from '../../shared/components/dropdown/dropdown';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';
import { NoProductsCardComponent } from './components/no-products-card/no-products-card';
import { ProductCardComponent } from './components/product-card/product-card';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';

import { isStringNullOrEmpty } from '../../shared/utils/isEmptyChecks.utils';
import { Category } from './types/category.type';

@Component({
  selector: 'pe-catalog',
  imports: [
    DropdownComponent,
    LoadingSpinnerComponent,
    NoProductsCardComponent,
    ProductCardComponent,
    SearchBarComponent,
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  store = inject(ProductStore);

  allProducts = computed(() => {
    return this.store.products$()
               .filter(p => {
                  return (
                    (
                      this.selectedCategory() === 'All' || startCase(p.category) === this.selectedCategory())
                    && (
                      isStringNullOrEmpty(this.searchText())
                      || (
                        p.category.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.description.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.image.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.price.toString().includes(this.searchText().toLowerCase())
                        || p.title.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.rating.count.toString().includes(this.searchText().toLowerCase())
                        || p.rating.rate.toString().includes(this.searchText().toLowerCase())
                      )
                    )
                  )
               })
    });

  categories = computed(() => {
    return ['All', ...Array.from(new Set(this.store.products$().map(p => startCase(p.category))))]
  });

  private selectedCategory = signal<Category | string>('All');
  private searchText = signal<string>('');

  onCategorySelection(category: Category | string) {
    this.selectedCategory.set(category);
  }

  onSearchProducts(searchText: string) {
    this.searchText.set(searchText);
  }
}
