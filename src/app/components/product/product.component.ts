import {Component, Input} from '@angular/core';
import {IProduct} from '../../models/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  title = 'Product';
  @Input() product: IProduct;
  details = false;
}
