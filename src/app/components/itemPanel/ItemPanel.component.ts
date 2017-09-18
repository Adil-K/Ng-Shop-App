import { IItemDTO, ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-panel',
  templateUrl: './itemPanel.component.html',
})
export class ItemPanelComponent implements OnInit {
  title = 'Panel view for the shop';

  items: IItemDTO[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getAll().subscribe(items => {
      this.items = items;
    });
  }
}
