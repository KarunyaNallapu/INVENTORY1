import { Component, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-update',
  templateUrl: './inventory-update.component.html',
  styleUrls: ['./inventory-update.component.scss']
})
export class InventoryUpdateComponent implements OnInit {
  /** Variables use for adding inventory */
  editPostForm = this.builder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    status: ['', Validators.required]

  });
  categories: any[] = [];
  postId: any;
  postData: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private dataService: DataService, private bsModalRef: BsModalRef) {
    this.dataService.getInventory().subscribe((data) => {
      Object.assign(this.categories, data);
    }, error => { console.log('Error while gettig category data.'); });
    /**Get the id of inventory from the servide using an observable and passing the id to api to update the specific id */
    this.dataService.inventoryIdData.subscribe((data: any) => {
      this.postId = data;
      if (this.postId !== undefined) {
        /**Passing the id to get the details of id to show in the form */
        this.dataService.getInventoryUpdateData(this.postId).subscribe(data => {
          console.log(this.postId)
          this.postData = data;
          console.log(data)
          /**Pacthing all the id details to form to update the inventory */
          if (this.editPostForm != null && this.postData != null) {
            this.editPostForm.patchValue(this.postData)
            console.log(this.editPostForm)
          }
        },
        /**Showing the swal if error errors while getting data */
          error => { 
            swal.fire({
              title: 'Get Inventory',
              text: 'Error while gettig inventory details',
              icon: 'error',
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            })
            
            console.log("Error while gettig inventory details") }
        );
      }
    });
  }
  ngOnInit() {

  }
  get f(){
    return this.editPostForm.controls;
  }
    /** Calling api to update the details */
  onPostEditFormSubmit() {
    /** If the form is valid api is called here amd swal is fired and then data is updated*/
    if (this.editPostForm.valid) {
      this.dataService.updateInventory(this.postId, this.editPostForm.value).subscribe(data => {
        swal.fire({
          title: 'Update Inventory',
          text: 'Updated Inventory Succesfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
      
        this.event.emit('OK');
        this.bsModalRef.hide();
      });
      
    } 
     /**If form is invalid or api fails the below swal is fired */
    else {
      swal.fire({
        title: 'Update Inventory',
        text: 'Updating Inventory Failed',
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
