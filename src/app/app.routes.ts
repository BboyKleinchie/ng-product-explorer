import { Routes } from '@angular/router';

import { Catalog } from './features/catalog/catalog';
import { NoPageFoundPage } from './shared/pages/no-page-found/no-page-found';

export const routes: Routes = [
  {
    path: '',
    component: Catalog
  },
  {
    path: '**',
    component: NoPageFoundPage
  }
];
