import { Injectable } from '@angular/core';
import { STORAGE_KEY } from '../../../shared/constants/storage.constants';
import { isStringNullOrEmpty } from '../../../shared/utils/isEmptyChecks.utils';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  retrieveProductIdsFromLocalStorage(): string[] {
    const favouriteProducts = localStorage.getItem(STORAGE_KEY.favouriteProducts);
    if (isStringNullOrEmpty(favouriteProducts ?? '')) return [];

    return Array.from(new Set(JSON.parse(favouriteProducts ?? '') as string[]));
  }
}
