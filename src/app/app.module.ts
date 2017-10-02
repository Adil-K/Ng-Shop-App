import { ItemResolve } from './resolvers/item.resolver';
import { ItemService } from './services/item.service';
import { BasketService } from './services/basket.service';
import { EventAggregator } from './event.aggregator';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { ItemTableComponent } from './components/itemTable/itemTable.component';
import { ItemPanelComponent } from './components/itemPanel/ItemPanel.component';
import { BasketComponent } from './components/basket/basket.component';
import { ShopItemComponent } from './components/shopItem/shopItem.component';

// instuctions for new conponent:
// import, add to routes if needed
// add to ngModule under declarations

const appRoutes: Routes = [
  { path: 'sandbox', component: SandboxComponent },
  { path: 'item-table', component: ItemTableComponent },
  {
    path: 'shop-item/:id',
    component: ShopItemComponent,
    resolve: {
      item: ItemResolve,
    },
  },
  { path: 'shop-item', component: ShopItemComponent },
  { path: 'item-panel', component: ItemPanelComponent },
  { path: '', redirectTo: '/item-table', pathMatch: 'full' },
];

@NgModule({
  // all declared components, directives
  declarations: [
    AppComponent,
    SandboxComponent,
    ItemTableComponent,
    ItemPanelComponent,
    ShopItemComponent,
    BasketComponent,
  ],
  // modules we depend on
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  // all services
  providers: [ItemService, ItemResolve, BasketService, EventAggregator],
  // root component
  bootstrap: [AppComponent],
})
export class AppModule {}
