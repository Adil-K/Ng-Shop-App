import { Basket } from './../models/basket.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item.model';

export interface IBasketItem {
  id: number;
  quantity: number;
}
export interface IBasket extends Array<IBasketItem> {}

@Injectable()
export class BasketService {
  constructor(private httpClient: HttpClient) {}

  getBasket(): Observable<Basket> {
    return this.httpClient
      .get<IBasket>(`/api/basket/`)
      .map(resource => new Basket(resource));
  }

  addItem(item: Item, quantity: number) {
    console.log('addItem... logged from basket service');
    return this.httpClient
      .post<IBasket>(`/api/basket/product/${item.id}`, {
        quantity,
      })
      .map(resource => new Basket(resource));
  }
}
