import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CategoryService} from '../category.service';
import {NotificationsComponent} from '../notifications/notifications.component';

declare var $: any;

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categoryMode = 'list';
    productMode = 'list';
    currentCategoryOnEdit;
    currentProductOnEdit;
    currentCategory;
    categoryDisplayedColumns = ['name', 'action'];
    categoriesPage: any;
    categoryDataSource = new MatTableDataSource(this.categoriesPage);

    productDisplayedColumns = ['name', 'price', 'action'];
    productsPage: any;
    productDataSource = new MatTableDataSource(this.productsPage);

    @ViewChild('categoryPaginator') categoryPaginator: MatPaginator;
    @ViewChild('categorySort') categorySort: MatSort;

    @ViewChild('productPaginator') productPaginator: MatPaginator;
    @ViewChild('productSort') productSort: MatSort;
    selectedCategory: any;
    query: any;

    constructor(public http: HttpClient, public notification: NotificationsComponent, public router: Router,
                public categoryservice: CategoryService/*, public productservice: ProductService */) {

    }

    ngAfterViewInit() {
        this.categoryDataSource.paginator = this.categoryPaginator;
        this.categoryDataSource.sort = this.categorySort;

        this.productDataSource.paginator = this.productPaginator;
        this.productDataSource.sort = this.productSort;
    }

    categoryApplyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.categoryDataSource.filter = filterValue;
    }

    productApplyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.productDataSource.filter = filterValue;
    }

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {

        this.categoryDataSource.paginator = this.categoryPaginator;
        this.productDataSource.paginator = this.productPaginator;

        this.categoryservice.getCategories()
            .subscribe(
                data => {
                    console.log(data);
                    this.categoriesPage = data;
                    this.categoryDataSource.data = this.categoriesPage._embedded.categories;
                },
                err => {
                    this.notification.showNotification('bottom', 'right', '0', err.error.error + ': ' + err.error.message);
                    console.log(err.error.error + ': ' + err.error.message);
                }
            )
        ;
    }

    onCheckCategory(category) {
        this.currentCategory = category;
        this.categoryservice.getRessource(category._links.products.href)
            .subscribe(
                data => {
                    this.productsPage = data;
                    this.productDataSource.data = this.productsPage._embedded.products;
                    // this.productservice.currentCategory = category.id;
                },
                err => {
                    this.notification.showNotification('bottom', 'right', '0', err.error.error + ': ' + err.error.message)
                    console.log(err.error.error + ': ' + err.error.message);
                }
            )
        ;
    }

    onNewCategory() {
        this.categoryMode = 'newCategory';
    }


    onSaveCategory(formData: any) {
        console.log(formData);

        this.categoryservice.postRessource('/categories', formData).subscribe((result) => {
            this.categoryMode = 'list';
            this.getCategories();
        })
    }

    onNewProduct() {
        this.productMode = 'newProduct';
    }

    onSaveProduct(formData: any) {
        console.log(formData);
        delete formData.searchQuery;
        this.categoryservice.postRessource('/customProducts', formData).subscribe((result) => {
            this.productMode = 'list';
            if (this.currentCategory != null) {
                this.onCheckCategory(this.currentCategory);
            }
        })
    }

    //
    // onEditCategory(category: Category) {
    //     this.categoryservice.currentCategory = this.categoriesPage[this.categoriesPage.indexOf(category)];
    //     this.router.navigate(['editcategory'])
    // }
    //
    // onEditProduct(product: Product) {
    //     this.productservice.currentProduct = this.productsPage[this.productsPage.indexOf(product)];
    //     this.router.navigate(['editproduct']);
    // }
    //
    onDeleteCategory(category) {
        console.log(this.categoriesPage._embedded.categories);
        console.log(this.categoriesPage._embedded.categories.indexOf(category));
        this.categoryservice.getRessource(category._links.products.href)
            .subscribe(
                (dataa: any) => {
                    if (dataa._embedded.products.length > 0) {
                        this.notification.showNotification('bottom', 'right', 0, 'Category is not empty.');
                    } else {
                        console.log(category._links.self.href);
                        this.categoryservice.deleteRessource(category._links.self.href)
                            .subscribe(
                                data => {
                                    this.categoriesPage._embedded.categories.splice(this.categoriesPage._embedded.categories.indexOf(category), 1);
                                    this.categoryDataSource.data = this.categoriesPage._embedded.categories;
                                    setTimeout(() => {
                                        this.categoryDataSource.paginator = this.categoryPaginator;
                                    });
                                    this.notification.showNotification('bottom', 'right', 1, 'Category deleted.');
                                },
                                err => {
                                    this.notification.showNotification('bottom', 'right', 0, err.error.error + ': ' + err.error.message);
                                }
                            )
                        ;
                        // console.log(client);
                    }
                },
                err => {
                    this.notification.showNotification('bottom', 'right', '0', err.error.error + ': ' + err.error.message)
                    console.log(err.error.error + ': ' + err.error.message);
                }
            )
        ;


    }
    //
    onDeleteProduct(product) {

        this.categoryservice.deleteRessource(product._links.self.href)
            .subscribe(
                data => {
                    this.productsPage._embedded.products.splice(this.productsPage._embedded.products.indexOf(product), 1);
                    this.productDataSource.data = this.productsPage._embedded.products;
                    setTimeout(() => {
                        this.productDataSource.paginator = this.productPaginator;
                    });
                    this.notification.showNotification('bottom', 'right', 1, 'Product deleted.');
                },
                err => {
                    this.notification.showNotification('bottom', 'right', 0, err.error.error + ': ' + err.error.message);
                }
            )
        ;
    }

    onEditCategory(row) {
        console.log(row);
        this.categoryMode = 'editCategory';
        this.currentCategoryOnEdit = row;

    }

    onSaveEditCategory(formData: any) {
        console.log(formData);
        this.categoryservice.patchRessource(this.currentCategoryOnEdit._links.self.href, formData).subscribe((result) => {
            console.log(result);
            this.categoryMode = 'list'
        })
    }

    onEditProduct(row) {
        console.log(row);
        this.categoryservice.getRessource(row._links.category.href).subscribe(((result: any) => {
            this.currentProductOnEdit._links.category.href = result._links.self.href;
        }))
        this.currentProductOnEdit = row;
        this.productMode = 'editProduct';
    }

    onSaveEditProduct(formData: any) {
        formData.id = this.currentProductOnEdit._links.self.href;
        console.log(formData);
        this.categoryservice.editProduct('/customProducts', formData).subscribe((result) => {
            this.productMode = 'list';
            this.onCheckCategory(this.currentCategory);
        })

    }

    onbackCategory() {
        this.categoryMode = 'list';
    }

    onbackProduct() {
        this.productMode = 'list';
    }
}
