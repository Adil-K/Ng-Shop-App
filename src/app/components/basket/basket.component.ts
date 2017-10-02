import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EventAggregator } from '../../event.aggregator';

import { ItemService } from '../../services/item.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent implements OnInit {
  title = 'Basket';
  sub: Subscription;

  constructor(
    private basketService: BasketService,
    private itemService: ItemService,
    private eventAggregator: EventAggregator,
  ) {}

  ngOnInit() {
    this.sub = this.eventAggregator.listenAll().subscribe(event => {
      if (event.type === 'addToBasket') {
        console.log(`added to basket`);
      }
    });
    this.basketService.getBasket().subscribe(basket => {
      console.log(`filled the basket`);
    });
  }

  onDelete() {}
}
