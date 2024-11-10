import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './../model/products.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  
  products$ = this.productsSubject.asObservable();

  /*
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
*/

private productUrl = "http://localhost:3000/products";

constructor( private http : HttpClient) { 
  const initialProducts: Product[] = [];
  this.productsSubject.next(initialProducts);
  this.getProducts()
}

getProducts() {
  this.http.get<Product[]>(this.productUrl).subscribe(products => {
    this.productsSubject.next(products);
  });
}

addProduct(product: Product) {
  this.http.post<Product>(this.productUrl, product).subscribe(p => this.getProducts() );
}  


deleteProduct(id: String): void {
  this.http.delete<void>(`${this.productUrl}/${id}`).subscribe(() => {
    this.getProducts();
  });
}

}
