import { IItemDTO } from '../services/item.service';

export class Item {
  id: number;
  sku: string;
  title: string;
  desc: string;
  image: string;
  stocked: boolean;
  basePrice: number;
  price: number;

  constructor(data?: IItemDTO) {
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
