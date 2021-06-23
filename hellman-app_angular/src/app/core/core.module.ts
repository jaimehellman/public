import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PanelComponent } from './panel/panel.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { GridviewComponent } from './gridview/gridview.component';
import { PaginationComponent } from './pagination/pagination.component';

import AlertService from './alert/alert.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GridviewService } from './gridview/gridview.service';
import { PaginationService } from './pagination/pagination.service';
import ModalService from './modal/modal.service';
import { CoreComponent } from './core.component';
import { ToastComponent } from './toast/toast.component';
import ToastService from './toast/toasr.service';
import { GridviewInlineComponent } from './gridview/gridview-inline/gridview-inline.component';
import { SimpleGridviewComponent } from './gridview/simple-gridview/simple-gridview.component';
import { GridviewInMemoryComponent } from './gridview/gridview-in-memory/gridview-in-memory.component';
import { GridviewDetailComponent } from './gridview/gridview-detail/gridview-detail.component';
import { ComboboxComponent } from './combo/combobox/combobox.component';
import { ComboSearchComponent } from './combo/combosearch/combosearch.component';
import { CombogridComponent } from './combo/combogrid/combogrid.component';
import { CombotreeComponent } from './combo/combotree/combotree.component';
import { CombotreegridComponent } from './combo/combotreegrid/combotreegrid.component';
import { TreeComponent } from './tree/tree.component';
import ConfirmService from './confirm/confirm.service';
import {GenericService} from '../services/generic-service';



@NgModule({
  declarations: [
    AlertComponent,
    BreadcrumbComponent,
    ComboboxComponent,
    ComboSearchComponent,
    CombogridComponent,
    CombotreeComponent,
    CombotreegridComponent,
    ConfirmComponent,
    GridviewComponent,
    GridviewDetailComponent,
    GridviewInlineComponent,
    GridviewInMemoryComponent,
    PaginationComponent,
    PanelComponent,
    CoreComponent,
    SimpleGridviewComponent,
    ToastComponent,
    TreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    AlertComponent,
    BreadcrumbComponent,
    ComboboxComponent,
    ComboSearchComponent,
    CombogridComponent,
    CombotreeComponent,
    CombotreegridComponent,
    ConfirmComponent,
    GridviewComponent,
    GridviewDetailComponent,
    GridviewInlineComponent,
    GridviewInMemoryComponent,
    PaginationComponent,
    PanelComponent,
    SimpleGridviewComponent,
    ToastComponent,
    TreeComponent,
  ],
  providers:[
    BsModalService,
    GridviewService,
    PaginationService,
    AlertService,
    ConfirmService,
    ModalService,
    ToastService,
    GenericService
  ]
  
})
export class CoreModule { }
