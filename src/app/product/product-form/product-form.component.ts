import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../model/products.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {

  public productForm!:FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      checked: [false]
    });
  }

  ngOnInit(): void {}

  addProduct() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: Math.floor(Math.random() * 10000).toString(), 
        ...this.productForm.value
      };
      this.productService.addProduct(newProduct);
      this.productForm.reset();
    }
  }
}
