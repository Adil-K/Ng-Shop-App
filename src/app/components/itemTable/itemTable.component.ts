import { ItemService, IItemDTO } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-table',
  templateUrl: './itemTable.component.html',
})
export class ItemTableComponent implements OnInit {
  title = 'Table view for the shop';

  items: IItemDTO[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    console.log('item-table');
    this.itemService.getAll().subscribe(items => {
      this.items = items;
    });
  }
}
