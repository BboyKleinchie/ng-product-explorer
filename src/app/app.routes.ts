import { Routes } from '@angular/router';

import { Catalog } from './features/catalog/catalog';
import { NoPageFoundPage } from './shared/pages/no-page-found/no-page-found';
import { unauthorizedAccessGuard } from './shared/guards/unauthorized-access/unauthorized-access.guard';

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
    path: 'favourite',
    loadComponent: () =>
      import('./features/favourite/favourite')
        .then(m => m.Favourite)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin')
        .then(m => m.Admin),
    canActivate: [unauthorizedAccessGuard]
  },
  {
    path: 'unauthorised',
    loadComponent: () =>
        import('./shared/pages/unauthorised/unauthorised')
        .then(m => m.Unauthorised)
  },
  {
    path: '**',
    component: NoPageFoundPage
  }
];
