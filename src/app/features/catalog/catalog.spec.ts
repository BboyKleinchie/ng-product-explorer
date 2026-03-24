import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Catalog } from './catalog';
import { ProductStore } from '../../core/stores/product/product-store';
import { Product } from '../../shared/models/product.model';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;

  let mockStore: Partial<ProductStore>;
  let router: { navigate: ReturnType<typeof vi.fn> };

  const mockProducts: Product[] = [
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
      rating: {
        rate: 1.9,
        count: 100
      }
    },
    {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      price: 64,
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
      rating: {
        rate: 3.3,
        count: 203
      }
    }
  ];

  beforeEach(async () => {
    mockStore = {
      products$: signal(mockProducts),
      isLoading$: signal(false),
      hasProducts: signal(true)
    };

    router = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Catalog],
      providers: [
        { provide: ProductStore, useValue: mockStore },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('Filtering', () => {
    it('should filter products by category', () => {
      component.onCategorySelection('Electronics');

      const result = component.filteredProducts();

      expect(result.length).toBe(1);
      expect(result[0].category).toBe('electronics');
    });

    it('should return all products when category is All', () => {
      component.onCategorySelection('All');

      const result = component.filteredProducts();

      expect(result.length).toBe(2);
    });

    it('should filter products by search text', () => {
      component.onSearchProducts('Gold');

      const result = component.filteredProducts();

      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Pierced Owl Rose Gold Plated Stainless Steel Double');
    });

    it('should return empty when search does not match', () => {
      component.onSearchProducts('non-existent');

      const result = component.filteredProducts();

      expect(result.length).toBe(0);
    });
  });

  describe('Sorting', () => {
    it('should sort products by price ascending', () => {
      component.onSortingSelection('Price: Lowest');

      const result = component.allProducts();

      expect(result[0].price).toBeLessThan(result[1].price);
    });

    it('should sort products by price descending', () => {
      component.onSortingSelection('Price: Highest');

      const result = component.allProducts();

      expect(result[0].price).toBeGreaterThan(result[1].price);
    });

    it('should sort products by rating descending', () => {
      component.onSortingSelection('Rating: Highest');

      const result = component.allProducts();

      expect(result[0].rating.rate).toBeGreaterThan(result[1].rating.rate);
    });

    it('should not sort when option is none', () => {
      component.onSortingSelection('None');

      const result = component.allProducts();

      expect(result).toEqual(component.filteredProducts());
    });
  });

  describe('Categories', () => {
    it('should generate categories list with All included', () => {
      const categories = component.categories();

      expect(categories).toContain('All');
      expect(categories).toContain('Electronics');
      expect(categories).toContain('Jewelery');
    });
  });

  describe('Navigation', () => {
    it('should navigate to product details', () => {
      const product = mockProducts[0];

      component.viewProductDetails(product);

      expect(router.navigate).toHaveBeenCalledWith([
        'product-details',
        product.id
      ]);
    });
  });

  describe('Template states', () => {
    it('should show loading state', () => {
      (mockStore.isLoading$ as any).set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Loading products');
    });

    it('should show no products message', () => {
      (mockStore.products$ as any).set([]);
      (mockStore.hasProducts as any).set(false);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('No Products Found');
    });

    it('should render product list when data exists', () => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('li');

      expect(items.length).toBe(mockProducts.length);
    });
  });
});
