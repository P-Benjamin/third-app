import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../model/products.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  public keyword : string="";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sÃ»re?"))
      this.productService.deleteProduct(product.id);
  }

  searchProducts() {
    if(this.keyword == "") 
      this.productService.updateList();
    else
    this.productService.searchProduct(this.keyword);
  }
}
