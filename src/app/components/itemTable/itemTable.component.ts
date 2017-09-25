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
    this.itemService.getAll().subscribe(items => {
      this.items = items;
    });
  }

  onDelete(item) {
    this.itemService.delete(item.id).subscribe(deletedItem => {
      this.items = this.items.filter(itm => itm.id !== deletedItem.id);
    });
  }
}
