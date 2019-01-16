import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule} from '@angular/material';
import {LoginPageComponent} from './login-page/login-page.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        // HttpModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        // AgmCoreModule.forRoot({
        //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        // })
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        // NgProgressModule.forRoot({
        //     color: 'red',
        //     thick: true
        // }),
        // NgProgressHttpModule.forRoot(),
        // NgProgressRouterModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginPageComponent,
    ],
    providers: [NotificationsComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
