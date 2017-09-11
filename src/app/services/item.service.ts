import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// must have 'add' to work: import 'rxjs/operators/map';
import 'rxjs/add/operator/map';

import { Item } from '../models/item.model';

export interface IItemDTO {
  id: number;
  sku?: string;
  title?: string;
  desc?: string;
  image?: string;
  stocked?: boolean;
  basePrice?: number;
}

@Injectable()
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.httpClient
      .get<IItemDTO[]>('/api/products')
      .map(data => data.map(resource => new Item(resource)));
  }

  get(id): Observable<Item> {
    return this.httpClient
      .get<IItemDTO>(`/api/products/${id}`)
      .map(data => new Item(data));
  }

  delete(id): Observable<Item> {
    return this.httpClient
      .delete<IItemDTO>(`/api/products/${id}`)
      .map(data => new Item(data));
  }

  save(item: Item): Observable<Item> {
    return this.httpClient
      .post<IItemDTO>(`/api/products/`, item)
      .map(data => new Item(data));
  }

  update(item: Item): Observable<Item> {
    return this.httpClient
      .put<IItemDTO>(`/api/products/${item.id}`, item)
      .map(data => new Item(data));
  }
}
