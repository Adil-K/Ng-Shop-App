import { ShopItemComponent } from './shopItem.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemResolve } from '../../resolvers/item.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ShopItemComponent,
    resolve: {
      product: ItemResolve,
    },
  },
  {
    path: '',
    component: ShopItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopItemRoutingModule {}
