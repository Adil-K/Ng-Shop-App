import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import 'rxjs/add/observable/of';

@Injectable()
export class ItemResolve implements Resolve<Item> {
  constructor(private itemService: ItemService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Item> {
    const id = route.params['id'];
    if (id) {
      return this.itemService.get(id);
    }
    return Observable.of(null);
  }
}
