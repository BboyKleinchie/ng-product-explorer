import { Component, computed, inject, signal } from '@angular/core';
import { orderBy, startCase } from 'lodash-es';
import { Router } from '@angular/router';

import { ProductStore } from '../../core/stores/product-store';

import { DropdownComponent } from '../../shared/components/dropdown/dropdown';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';
import { NoProductsCardComponent } from '../../shared/components/card/no-products-card/no-products-card';
import { ProductCardComponent } from './components/product-card/product-card';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';

import { Category } from '../../shared/types/category.type';
import { sortingOptions, SortingOption } from '../../shared/types/sorting-options.type';
import { isStringNullOrEmpty, isPropertyNull } from '../../shared/utils/isEmptyChecks.utils';
import { Product } from '../../shared/models/product.model';

interface SortOrder {
  property: string;
  order: 'asc' | 'desc';
}

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

  readonly allProducts = computed(() => {
    if (isPropertyNull(this.sortOrder()) || this.sortOrder()?.property.toLowerCase() === 'none') return this.filteredProducts();

    return orderBy(
      this.filteredProducts(),
      this.sortOrder()?.property,
      this.sortOrder()?.order || 'asc'
    );
  });

  readonly filteredProducts = computed(() => {
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

  readonly categories = computed(() => {
    return ['All', ...Array.from(new Set(this.store.products$().map(p => startCase(p.category))))]
  });

  readonly sortingOptions$ = computed(() => this.sortingOptions());

  private selectedCategory = signal<Category | string>('All');
  private searchText = signal<string>('');
  private sortingOptions = signal<SortingOption[]>(sortingOptions);
  private sortOrder = signal<SortOrder | null>(null);

  private router = inject(Router);

  onCategorySelection(category: Category | string) {
    this.selectedCategory.set(category);
  }

  onSearchProducts(searchText: string) {
    this.searchText.set(searchText);
  }

  onSortingSelection(option: SortingOption | string) {
    this.sortOrder.set({
      property: (
        option.toLowerCase().includes('rating') ? 'rating.rate'
        : option.toLowerCase().includes('price') ? 'price'
        : 'none'
      ),
      order: option.toLocaleLowerCase().includes('highest') ? 'desc' : 'asc'
    });
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['product-details', product.id]);
  }
}
