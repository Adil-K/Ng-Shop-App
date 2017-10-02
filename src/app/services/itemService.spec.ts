import { Observable } from 'rxjs/Observable';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { ItemService } from './item.service';
import { Item } from './../models/item.model';
import { environment } from '../../environments/environment';

describe('campaign service', () => {
  let service;
  let httpMock;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [ItemService],
        imports: [HttpClientTestingModule],
      });
      inject(
        [ItemService, HttpTestingController],
        (_service: ItemService, _httpMock: HttpTestingController) => {
          service = _service;
          httpMock = _httpMock;
        },
      );

      it('get all items', () => {
        service.getAll().subscribe(items => {});
        const req = httpMock.expectOne(
          environment.apiBaseUrl + '/api/products',
        );
      });
    }),
  );
});
