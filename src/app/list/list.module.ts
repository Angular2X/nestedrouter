import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import {
  ListComponent,
  ProductList,
  ProductRow,
  PriceDisplay,
  ProductImage,
  ProductDepartment,
} from './list.component';
import { CommunityComponent } from './community/community.component';
import { FeatureComponent } from './feature/feature.component';
import { StyleComponent } from './style/style.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'community', component: CommunityComponent },
  /*{ path: ':id', component: StyleComponent },*/
  { path: 'feature', component: FeatureComponent },
  { path: 'style', component: StyleComponent },
];


@NgModule({
  declarations: [
    ProductList,
    ProductRow,
    PriceDisplay,
    ProductImage,
    ProductDepartment,
    CommunityComponent,
    FeatureComponent,
    StyleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes) // <-- routes
  ],
  exports: [
    ProductList,
    ProductRow,
    PriceDisplay,
    ProductImage,
    ProductDepartment,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class ListModule { }
