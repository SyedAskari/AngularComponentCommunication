import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';
    monthCount: number;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.selectedProductChanges$.subscribe(selectedProduct => {

            if (selectedProduct) {
                this.monthCount = 10;
            } else {
                this.monthCount = 0;
            }
        });
    }

}
