import { ShopItemComponent } from './shopItem.component';
import { ShopItemRoutingModule } from './shopItem.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [ShopItemComponent],
  providers: [],
  exports: [ShopItemComponent],
})
export class ShopItemModule {}
