import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    token: string;

    constructor(public http: HttpClient) {
        console.log('Hello TokenProvider Provider');
    }

    saveToken(token: string) {
        localStorage.setItem('jwt', token);
    }

    getToken() {
        this.token = localStorage.getItem('jwt');
        return this.token;
    }

    deleteToken() {
        localStorage.removeItem('jwt');
    }
}
