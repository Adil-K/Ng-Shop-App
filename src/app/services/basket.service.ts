import { BasketItem } from './../models/baket.item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface IBasketItem {
  id: number;
  quantity: number;
}

@Injectable()
export class BasketService {
  constructor(private httpClient: HttpClient) {}

  getBasket(): Observable<IBasketItem[]> {
    return this.httpClient
      .get<IBasketItem[]>(`/api/basket/`)
      .map(resource => resource.map(item => new BasketItem(item)));
  }
}
