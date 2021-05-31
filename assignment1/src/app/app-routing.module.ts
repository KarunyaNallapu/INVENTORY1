import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryAddComponent } from './features/inventory-add/inventory-add.component';
import { InventoryDeleteComponent } from './features/inventory-delete/inventory-delete.component';
import { InventoryListComponent } from './features/inventory-list/inventory-list.component';
import { InventoryUpdateComponent } from './features/inventory-update/inventory-update.component';
import { InventoryComponent } from './features/inventory/inventory.component';

const routes: Routes = [
  { path: 'inventory', redirectTo: 'inventory/list', pathMatch: 'full'},
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/list', component: InventoryListComponent },
  { path: 'inventory/create', component: InventoryAddComponent },
  { path: 'inventory/update/:productId', component: InventoryUpdateComponent } ,
  { path: 'inventory/delete/:productId', component: InventoryDeleteComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
