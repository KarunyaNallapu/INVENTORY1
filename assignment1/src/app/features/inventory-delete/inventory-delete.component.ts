import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-delete',
  templateUrl: './inventory-delete.component.html',
  styleUrls: ['./inventory-delete.component.scss']
})
export class InventoryDeleteComponent implements OnInit {
    /** Variables use for adding inventory */
  postId: any;
  title: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private dataService: DataService) {
    this.dataService.inventoryIdData.subscribe((user: any) => this.postId = user);
    console.log(this.postId)
  }
  ngOnInit() {

  }
/** Calling api to submit the id and delete the inventory */
  deletePost(del: number) {
    /** If api is called is success swal is fired and then data is deleted*/
    if (this.postId != null || undefined) {
      this.dataService.deleteInventory(del).subscribe();
      swal.fire({
        title: 'Delete Inventory',
        text: 'Deleted Inventory Succesfully',
        icon: 'success',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      this.event.emit('OK');
      this.bsModalRef.hide();
      
    } 
    /**If api fails the below swal is fired */
    else {
      swal.fire({
        title: 'Delete Inventory',
        text: 'Deleting Inventory Failed',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      
    }

  }
  /**Closing the modal on close */
  onClose() {
    this.bsModalRef.hide();

  }



}
