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

  private productUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
    const initialProducts: Product[] = [];
    this.productsSubject.next(initialProducts);
    this.updateList();
  }

  updateList(){
    this.getProducts().subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  getProducts() {
      return this.http.get<Product[]>(this.productUrl);
  }

  addProduct(product: Product) {
    this.http
      .post<Product>(this.productUrl, product)
      .subscribe(() => this.updateList());
  }

  deleteProduct(id: String){
    this.http.delete<void>(`${this.productUrl}/${id}`).subscribe(() => {
      this.updateList();
    });
  }

  searchProduct( keyword : string){
    this.getProducts().subscribe(p => this.productsSubject.next(p.filter( product => product.name.match(keyword))))
  }
}
