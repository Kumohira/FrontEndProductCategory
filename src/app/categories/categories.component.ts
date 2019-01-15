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

    constructor(public http: HttpClient, public notification: NotificationsComponent, public router: Router, public categoryservice: CategoryService/*, public productservice: ProductService */) {

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
    // onDeletecategory(category: Category) {
    //     if (category.products.length > 0) {
    //         this.showNotification('bottom', 'right', 0, 'Vous ne pouvais pas supprimé un produit non vide.');
    //     } else {
    //         this.categoryservice.deleteCategory(category.id)
    //             .subscribe(
    //                 data => {
    //                     this.categoriesPage.splice(this.categoriesPage.indexOf(category), 1);
    //                     this.categoryDataSource.data = this.categoriesPage;
    //                     setTimeout(() => {
    //                         this.categoryDataSource.paginator = this.categoryPaginator;
    //                     });
    //                     this.showNotification('bottom', 'right', 1, 'Le produit a été supprimé avec succès.');
    //                 },
    //                 err => {
    //                     this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
    //                 }
    //             )
    //         ;
    //         // console.log(client);
    //     }
    //
    // }
    //
    // onDeleteProduct(product: Product) {
    //     this.clientservice.getClientsByProduct(product.id)
    //         .subscribe(
    //             clientList => {
    //
    //                 const clients: Array<string> = clientList;
    //                 if (clients.length > 0) {
    //
    //                     let message = 'Le sous-produit que vous voullez suppimé a des client qui y ont accés. [ ';
    //                     clients.forEach(client => {
    //                         message = message.concat(client + ', ');
    //                     });
    //                     message = message.slice(0, -2);
    //                     message = message.concat(' ]');
    //
    //                     this.showNotification('bottom', 'right', 0, message);
    //                 } else {
    //                     this.productservice.deleteProduct(product.id)
    //                         .subscribe(
    //                             data => {
    //                                 this.productsPage.splice(this.productsPage.indexOf(product), 1);
    //                                 this.productDataSource.data = this.productsPage;
    //                                 setTimeout(() => {
    //                                     this.productDataSource.paginator = this.productPaginator;
    //                                 });
    //                                 this.showNotification('bottom', 'right', 1, 'Le sous-produit a été supprimé avec succès.');
    //                             },
    //                             err => {
    //                                 this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
    //                             }
    //                         )
    //                     ;
    //                 }
    //             },
    //             (err: HttpErrorResponse) => {
    //                 console.log(err);
    //                 if (err.status === 500) {
    //                     this.showNotification('bottom', 'right', 0, 'Erreur system');
    //                 } else {
    //                     this.showNotification('bottom', 'right', 0, 'Erreur inconnu');
    //                 }
    //
    //             }
    //         )
    //     ;
    // }

}
