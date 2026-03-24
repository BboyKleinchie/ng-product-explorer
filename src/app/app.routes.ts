import { Routes } from '@angular/router';

import { Catalog } from './features/catalog/catalog';
import { NoPageFoundPage } from './shared/pages/no-page-found/no-page-found';

export const routes: Routes = [
  {
    path: '',
    component: Catalog
  },
  {
    path: 'product-details/:productId',
    loadComponent: () =>
      import('./features/product-details/product-details')
        .then(m => m.ProductDetails)
  },
  {
    path: '**',
    component: NoPageFoundPage
  }
];
