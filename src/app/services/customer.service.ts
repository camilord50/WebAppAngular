import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prediction } from '../models/prediction';
import { Order } from '../models/order';
import { Employee } from '../models/employee';
import { Product } from '../models/product';
import { Shipper } from '../models/shipper';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  getPredictions(page = 1, pageSize = 10, sortBy = 'customerName', sortDir = 'asc', filter = ''): Observable<{items: Prediction[], total: number}> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize))
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (filter) params = params.set('filter', filter);

    return this.http.get<any>(`${this.base}/Customers/predictions`, { params }).pipe(
      map(resp => {
        if (resp && resp.items && typeof resp.total === 'number') {
          return { items: resp.items as Prediction[], total: resp.total as number };
        }
        const arr: Prediction[] = Array.isArray(resp) ? resp : [];
        const filtered = filter ? arr.filter(i => i.customerName.toLowerCase().includes(filter.toLowerCase())) : arr;
        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const items = filtered.slice(start, start + pageSize);
        return { items, total };
      }),
      catchError(err => {
        console.error('getPredictions error', err);
        return of({ items: [], total: 0 });
      })
    );
  }

  getOrdersByCustomerName(customerName: string) {
    const url = `${this.base}/Customers/${encodeURIComponent(customerName)}/orders`;
    return this.http.get<Order[]>(url).pipe(catchError(err => { console.error(err); return of([]); }));
  }

  getEmployees() { return this.http.get<Employee[]>(`${this.base}/Employees`).pipe(catchError(() => of([]))); }
  getProducts() { return this.http.get<Product[]>(`${this.base}/Products`).pipe(catchError(() => of([]))); }
  getShippers() { return this.http.get<Shipper[]>(`${this.base}/Shippers`).pipe(catchError(() => of([]))); }

  postOrder(payload: any) {
    return this.http.post<{orderId:number}>(`${this.base}/Orders`, payload);
  }

  getCustomerIdByName(name: string) {
    return this.http.get<any>(`${this.base}/Customers/byName/${encodeURIComponent(name)}`).pipe(
      map(r => r?.custId ?? r?.id ?? null),
      catchError(() => of(null))
    );
  }
}
