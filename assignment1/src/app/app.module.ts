import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import { InventoryComponent } from './features/inventory/inventory.component';
import { InventoryAddComponent } from './features/inventory-add/inventory-add.component';
import { InventoryDeleteComponent } from './features/inventory-delete/inventory-delete.component';
import { InventoryListComponent } from './features/inventory-list/inventory-list.component';
import { InventoryUpdateComponent } from './features/inventory-update/inventory-update.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    InventoryListComponent,
    InventoryAddComponent,
    InventoryDeleteComponent,
    InventoryUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
