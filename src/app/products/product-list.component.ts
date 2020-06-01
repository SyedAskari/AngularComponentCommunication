import { ProductParameterService } from './product-parameter.service';
import { CriteriaComponent } from './../shared/criteria/criteria.component';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    includeDetail: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;


    filteredProducts: IProduct[];
    products: IProduct[];


    get showImage() {
        return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
         this.productParameterService.showImage = value;
    }

    constructor(private productService: ProductService,
                private productParameterService: ProductParameterService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                // Setting the value of the child component will emit the changes from the
                // setter and the onValueChange method of this component will be called
                // the filter will be performed there
                this.filterComponent.listFilter = this.productParameterService.filterBy;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
