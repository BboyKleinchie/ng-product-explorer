import { inject, Injectable } from '@angular/core';
import { delayWhen, interval, Observable, of } from 'rxjs';

import { MockService } from '../../../core/services/mock/mock.service';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private mockService = inject(MockService);

  // returning an observable to imitate an httpClient call which returns an Observable
  listProducts(): Observable<Product[]> {
    return of(this.mockService.returnMockData<Product[]>('products') || []).pipe(
      delayWhen(() => interval(Math.random() * 5000)) // simulate network latency
    );
  }
}
