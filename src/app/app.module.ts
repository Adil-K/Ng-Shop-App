import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { ItemTableComponent } from './components/itemTable/itemTable.component';
import { ItemPanelComponent } from './components/itemPanel/ItemPanel.component';
import { ShopItemComponent } from './components/shopItem/shopItem.component';
import { CartComponent } from './components/cart/cart.component';

// instuctions for new conponent:
// import, add to routes if needed
// add to ngModule under declarations

const appRoutes: Routes = [
  { path: 'sandbox', component: SandboxComponent },
  { path: 'item-table', component: ItemTableComponent },
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
    CartComponent,
  ],
  // modules we depend on
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  // all services
  providers: [],
  // root component
  bootstrap: [AppComponent],
})
export class AppModule {}