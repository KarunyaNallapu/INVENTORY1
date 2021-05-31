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
  inventoryList: any[] = [];
  bsModalRef!: BsModalRef;
  p:number=1;

  constructor(private dataService: DataService, private bsModalService: BsModalService) {
    this.getPosts();
  }
  ngOnInit(){
    
  }

  getPosts() {
    this.dataService.getInventory().subscribe(data => {
      Object.assign(this.inventoryList, data);
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }

  addNewPost() {
    this.bsModalRef = this.bsModalService.show(InventoryAddComponent);
    this.bsModalRef.content.event.subscribe((result:any) => {
      if (result == 'OK') {
        this.getPosts();
      }
    });
  }

  deletePost(inventoryId: number,title:string) {
    this.dataService.editUser(inventoryId);
    this.bsModalRef = this.bsModalService.show(InventoryDeleteComponent);
    this.bsModalRef.content.id = inventoryId;
    this.bsModalRef.content.title = name;
    this.bsModalRef.content.event.subscribe((result:any) => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
          this.inventoryList=[];
          this.getPosts();
        }, 500);
      }
    });
  }

  editPost(inventoryId: number) {
    this.dataService.editUser(inventoryId);
    console.log(inventoryId)

    this.bsModalRef = this.bsModalService.show(InventoryUpdateComponent);
    this.bsModalRef.content.inventoryId = inventoryId;
    this.bsModalRef.content.event.subscribe((result:any) => {
      if (result == 'OK') {
        setTimeout(() => {
          this.getPosts();
        }, 5000);
      }
    });
  }
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.inventoryList.length
  };


pageChanged(event:any){
  this.config.currentPage = event;
}

}
