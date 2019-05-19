import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeepCopyService {

  constructor() { }

  copy<T>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
