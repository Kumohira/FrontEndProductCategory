import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {CategoriesComponent} from '../../categories/categories.component';
import {ProductsComponent} from '../../products/products.component';
import {CdkTableModule} from '@angular/cdk/table';

// @NgModule({
//     exports: [
//         CdkTableModule,
//         MatAutocompleteModule,
//         MatButtonModule,
//         MatButtonToggleModule,
//         MatCardModule,
//         MatCheckboxModule,
//         MatChipsModule,
//         MatStepperModule,
//         MatDatepickerModule,
//         MatDialogModule,
//         MatDividerModule,
//         MatExpansionModule,
//         MatGridListModule,
//         MatIconModule,
//         MatInputModule,
//         MatListModule,
//         MatMenuModule,
//         MatNativeDateModule,
//         MatPaginatorModule,
//         MatProgressBarModule,
//         MatProgressSpinnerModule,
//         MatRadioModule,
//         MatRippleModule,
//         MatSelectModule,
//         MatSidenavModule,
//         MatSliderModule,
//         MatSlideToggleModule,
//         MatSnackBarModule,
//         MatSortModule,
//         MatTableModule,
//         MatTabsModule,
//         MatToolbarModule,
//         MatTooltipModule,
//     ]
// })
// export class DemoMaterialModule {
// }

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        // TreeviewModule.forRoot(),
        // NgxMaterialTimepickerModule.forRoot(),
        FormsModule,

        // ReactiveFormsModule,
        // HttpModule,
        // HttpClientModule,

        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatFormFieldModule,
    ],
    declarations: [
        CategoriesComponent,
        ProductsComponent,

        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
    ]
})

export class AdminLayoutModule {
}
