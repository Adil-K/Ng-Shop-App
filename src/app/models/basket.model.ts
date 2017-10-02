import { IBasketItem, IBasket } from './../services/basket.service';

export class BasketItem {
  id: number;
  title: string;

  constructor(data?: IBasketItem) {
    if (data) {
      this.id = data.id;
    }
  }
}

export class Basket {
  id: number;
  quantity: number;

  constructor(data?: IBasket) {
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
