import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    currentCategory: any;

    constructor(public http: HttpClient, public authenticationService: AuthenticationService, public tokenService: TokenService) {
    }

    getCategories() {
        return this.http.get(this.authenticationService.dataHost + '/categories');
    }

    getRessource(url) {
        const reqHeader = new HttpHeaders({
            'content-type': 'application/json',
            'Authorization': this.tokenService.getToken(),
        });

        return this.http.get(url, {headers: reqHeader});
    }

    deleteRessource(url) {
        const reqHeader = new HttpHeaders({
            'content-type': 'application/json',
            'Authorization': this.tokenService.getToken(),
        });

        return this.http.delete(url, {headers: reqHeader});
    }

    patchRessource(url, data) {
        const reqHeader = new HttpHeaders({
            'content-type': 'application/json',
            'Authorization': this.tokenService.getToken(),
        });

        return this.http.patch(url, data, {headers: reqHeader});
    }

    
    postRessource(endpoint, data) {
        const reqHeader = new HttpHeaders({
            'content-type': 'application/json',
            'Authorization': this.tokenService.getToken(),
        });

        return this.http.post(this.authenticationService.dataHost + endpoint, data, {headers: reqHeader});
    }

    // getProduct(id: number) {
    //     return this.http.get(this.authenticationService.host + '/products/' + id);
    // }
    //
    // saveProduct(product: Product) {
    //     return this.http.post(this.authenticationService.host + '/products', product);
    // }
    //
    // editProduct(product: Product) {
    //     return this.http.put(this.authenticationService.host + '/products/' + product.id, product);
    // }
    //
    // deleteProduct(id: number) {
    //     return this.http.delete(this.authenticationService.host + '/products/' + id);
    // }
    editProduct(endpoint: string, formData: any) {
        const reqHeader = new HttpHeaders({
            'content-type': 'application/json',
            'Authorization': this.tokenService.getToken(),
        });

        return this.http.put(this.authenticationService.dataHost + '/customProducts', formData, {headers: reqHeader});
    }
}
