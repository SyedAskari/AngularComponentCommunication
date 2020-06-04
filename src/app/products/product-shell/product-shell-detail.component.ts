import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    /*
    get product(): IProduct | null {
        return this.productService.currentProduct;
    }
    */

    sub: Subscription;
    product: IProduct | null;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe( selectedProduct => this.product = selectedProduct);
    }

    // In order to avoid memeory leak we need to unsubscribe
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
