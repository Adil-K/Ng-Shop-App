import { IItemDTO, ItemService } from './../../services/item.service';
import { BasketService } from '../../services/basket.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventAggregator } from '../../event.aggregator';

@Component({
  selector: 'item-panel',
  templateUrl: './itemPanel.component.html',
})
export class ItemPanelComponent implements OnInit {
  title = 'Panel view for the shop';
  items: IItemDTO[] = [];
  @Input() item;
  @Output() addItem = new EventEmitter();

  constructor(
    private itemService: ItemService,
    private basketService: BasketService,
    private eventAggregator: EventAggregator,
  ) {}

  ngOnInit() {
    this.itemService.getAll().subscribe(items => {
      this.items = items;
    });
  }

  onItemAdd(event) {
    this.basketService.addItem(event.product, event.quantity).subscribe(() => {
      this.eventAggregator.publish('addToBasket', event);
      console.log('event ,', event);
    });
  }

  onAdd() {
    console.log('clicked add to cart');
    this.addItem.emit({
      item: this.item,
    });
  }
}
