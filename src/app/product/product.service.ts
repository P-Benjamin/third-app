import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  
  products$ = this.productsSubject.asObservable();

  constructor() {
    const initialProducts: Product[] = [];
    this.productsSubject.next(initialProducts);
  }

  addProduct(product: Product) {
    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, product]);
  }

  getProducts() {
    return this.productsSubject.value;
  }

  deleteProduct(id: number): void {
    const newProductsList = this.productsSubject.value.filter((product) => product.id != id);
    this.productsSubject.next([...newProductsList]);
  }

}
