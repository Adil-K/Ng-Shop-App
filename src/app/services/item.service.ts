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

  getItems(): Observable<Item[]> {
    return this.httpClient
      .get<IItemDTO[]>('/api/products')
      .map(data => data.map(resource => new Item(resource)));
  }
}
