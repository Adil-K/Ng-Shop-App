import { IBasketItem } from './../services/basket.service';

export class BasketItem {
  id: number;
  quantity: number;

  constructor(data?: IBasketItem) {
    if (data) {
      Object.assign(this, data);
    }
  }

  updateBy(data: any) {
    Object.assign(this, data);
  }

  isNew() {
    return !this.id;
  }
}
