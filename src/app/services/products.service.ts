import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, retry, tap} from 'rxjs/operators'; // <- добавьте этот импорт
import { IProduct } from '../models/product';
import {ErrorService} from './error.service';
import {products} from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: { limit: '10' } // <- здесь изменено значение на строку
      })
    }).pipe(
      delay(2000),
      retry(2),
      // tslint:disable-next-line:no-shadowed-variable
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
    );
  }

  // tslint:disable-next-line:typedef
  private errorHandler(error: HttpErrorResponse){
    this.errorService.handle(error.message);
    return throwError(error.message);
  }

  create(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(
        tap(prod => this.products.push(prod))
      );
  }
}
