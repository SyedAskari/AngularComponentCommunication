import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // When we naviagte back and we want the selected product to selected
    // we can subscribe to the selected product
    this.productService.selectedProductChanges$.subscribe(selectedProduct => {
      this.selectedProduct = selectedProduct;
    });

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSelected(product: IProduct): void {
    // this.productService.currentProduct = product;
    this.productService.changeSelectedProduct(product);
  }

}
