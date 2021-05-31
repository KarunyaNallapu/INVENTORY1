import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import { InventoryAddComponent } from '../inventory-add/inventory-add.component';
import { InventoryDeleteComponent } from '../inventory-delete/inventory-delete.component';
import { InventoryUpdateComponent } from '../inventory-update/inventory-update.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
   /** Variables use for adding inventory */
  inventoryList: any[] = [];
  bsModalRef!: BsModalRef;
  p: number = 1;
  /**Customization for showing the pagination */
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.inventoryList.length
  };

  constructor(private dataService: DataService, private bsModalService: BsModalService) {
    this.getPosts();
  }
  ngOnInit() {

  }
/**calling get api of inventory list to show data in the table */
  getPosts() {
    this.dataService.getInventory().subscribe(data => {
      Object.assign(this.inventoryList, data);
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }
/**Opening the add inventory component on clicking the 'add inventory' button */
  addNewPost() {
    this.bsModalRef = this.bsModalService.show(InventoryAddComponent);
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'OK') {
        this.getPosts();
      }
    });
  }
/**Opening the delete inventory component on clicking the 'mat delete' icon */
  deletePost(inventoryId: number, title: string) {
    this.dataService.editUser(inventoryId);
    this.bsModalRef = this.bsModalService.show(InventoryDeleteComponent);
    this.bsModalRef.content.id = inventoryId;
    this.bsModalRef.content.title = name;
    this.bsModalRef.content.event.subscribe((result: any) => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
          this.inventoryList = [];
          this.getPosts();
        }, 500);
      }
    });
  }
/**Opening the update inventory component on clicking the 'mat edit' icon */
  editPost(inventoryId: number) {
    this.dataService.editUser(inventoryId);
    console.log(inventoryId)

    this.bsModalRef = this.bsModalService.show(InventoryUpdateComponent);
    this.bsModalRef.content.inventoryId = inventoryId;
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'OK') {
        setTimeout(() => {
          this.getPosts();
        }, 5000);
      }
    });
  }

  /**Even to get data and show the page num */

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

}
