import { Item } from './../../models/item.model';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'shop-item',
  templateUrl: './shopItem.component.html',
})
export class ShopItemComponent implements OnInit {
  item = new Item();
  shopItemForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private location: Location,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.item = this.activeRoute.snapshot.data['item'] as Item;

    this.shopItemForm = new FormGroup({
      sku: new FormControl(''),
      title: new FormControl(''),
      price: new FormControl(''),
      basePrice: new FormControl(''),
      desc: new FormControl(''),
      stocked: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    form['submitted'] = true;
    if (!form.valid) {
      return;
    }
    this.item.updateBy(this.shopItemForm.value);
    this.itemService.save(this.item).subscribe(() => {
      this.location.back();
    });
  }
}
