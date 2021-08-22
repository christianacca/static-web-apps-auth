import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonUiModule } from '@christianacca/demo-app/common-ui';
import { EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entity-metadata';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonUiModule],
  exports: [RouterModule, ProductsComponent],
  declarations: [ProductsComponent, ProductListComponent, ProductDetailComponent]
})
export class ProductsModule {
  constructor(private eds: EntityDefinitionService) {
    this.eds.registerMetadataMap(entityMetadata);
  }
}
