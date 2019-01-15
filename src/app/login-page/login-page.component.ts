import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {TokenService} from '../token.service';
import {NotificationsComponent} from '../notifications/notifications.component';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    isLoginError = false;
    errorMessage = 'Erreur Inconnu';

    constructor(public router: Router, public authenticationService: AuthenticationService, public tokenService: TokenService, public notification: NotificationsComponent) {
        if (this.tokenService.getToken() != null) {
            console.log('Token exist');
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {

    }

    onSubmit(dataForm) {

        this.authenticationService.Login(dataForm).subscribe(
            data => {
                console.log(data.headers.get('Authorization'));
                // this.tokenProvider.token = data["access"];
                this.tokenService.saveToken(data.headers.get('Authorization'));
                // console.log(this.tokenProvider.token);
                this.router.navigate(['/dashboard']);
            },
            (err) => {
                this.notification.showNotification('bottom', 'right', '0', 'bad credentials');
            }
        );
    }

    // onSubmit(data) {
    //     console.log(data);
    //     // (<HTMLInputElement> document.getElementById('submit')).disabled = true;
    //     // this.authenticationService.authenticateUser(username, password).subscribe(
    //     //     (data) => {
    //     //         console.log('yes');
    //     //     },
    //     //     (err: HttpErrorResponse) => {
    //     //         (<HTMLInputElement> document.getElementById('submit')).disabled = false;
    //     //         console.log('No');
    //     //         console.log(err);
    //     //     })
    // };

    // OnSubmit(username, password) {
    //     // let postData = new HttpParams();
    //     // postData = postData.set('username', username);
    //     // postData = postData.set('password', password);
    //     //
    //     // const reqHeader = new HttpHeaders({
    //     //     // 'No-Auth': 'true',
    //     //     // 'Content-Type': 'application/json',
    //     //     'Content-Type': 'application/x-www-form-urlencoded'
    //     //     // 'Authorization': this.tokenService.getToken(),
    //     // });
    //
    //     (<HTMLInputElement> document.getElementById('submit')).disabled = true;
    //     this.authenticationService.Login(username, password).subscribe(
    //         (data) => {
    //             console.log(data);
    //             // this.tokenProvider.token = data["access"];
    //             //*this.tokenService.saveToken(data['jwt']);
    //             // console.log(this.tokenProvider.token);
    //             //*this.router.navigate(['/dashboard']);
    //         },
    //         (err: HttpErrorResponse) => {
    //             (<HTMLInputElement> document.getElementById('submit')).disabled = false;
    //             this.notification.showNotification('bottom', 'right', '0', 'bad credentials');
    //         }
    //     )
    // };

}
