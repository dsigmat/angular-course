import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../models/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProduct[], search: string): IProduct[] {
    if (!search) { return products; } // Возвращает все продукты, если строка поиска пуста

    return products.filter(
      p => p.title
        .toLowerCase()
        .includes(search.toLowerCase()));
  }

}
