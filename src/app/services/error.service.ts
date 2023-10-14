import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new Subject();

  // tslint:disable-next-line:typedef
  handle(message: string){
    this.error$.next(message);
  }

  // tslint:disable-next-line:typedef
  clear(){
    this.error$.next('');
  }
}
