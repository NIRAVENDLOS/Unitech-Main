import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { IssueComponent } from './issue/issue.component';
import { IndentComponent } from './indent/indent.component';


@NgModule({
  declarations: [
    ProductUnitComponent,
    ProductItemComponent,
    ProductCategoryComponent,
    IssueComponent,
    IndentComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbToggleModule,
    NbSelectModule,
    NbIconModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbDialogModule.forChild(),
  ],
  // providers: [DecimalPipe],
})
export class StoreModule { }
