import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { signal } from '@angular/core';
import { NoProductsCardComponent } from './no-products-card';

describe('NoProductsCardComponent', () => {
  let component: NoProductsCardComponent;
  let fixture: ComponentFixture<NoProductsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoProductsCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoProductsCardComponent);
    component = fixture.componentInstance;

    component.title = signal('No Products Found') as unknown as typeof component.title;
    component.description = signal("Sorry, we couldn't find any products matching your search") as unknown as typeof component.description;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
