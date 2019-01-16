import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    readonly authHost = 'http://localhost:8080';
    readonly dataHost = 'http://localhost:8081';

    constructor(public http: HttpClient, public tokenService: TokenService) {
    }

    Register(postData, reqHeader) {
        return this.http.post(this.authHost + '/register', postData, {headers: reqHeader});
    }

    Login(data) {
        return this.http.post(this.authHost + '/login', data, {observe: 'response'});
    }

    Logout() {
        this.tokenService.token = null;
        this.tokenService.deleteToken();
    }
}
