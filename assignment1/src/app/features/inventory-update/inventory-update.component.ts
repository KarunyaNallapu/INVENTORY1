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

    this.dataService.inventoryIdData.subscribe((data: any) => {
      this.postId = data;
      if (this.postId !== undefined) {
        this.dataService.getInventoryUpdateData(this.postId).subscribe(data => {
          console.log(this.postId)
          this.postData = data;
          console.log(data)

          if (this.editPostForm != null && this.postData != null) {
            this.editPostForm.patchValue(this.postData)
            console.log(this.editPostForm)
          }
        },
          error => { console.log("Error while gettig post details") }
        );
      }
    });
  }
  ngOnInit() {

  }
  get f(){
    return this.editPostForm.controls;
  }
  onPostEditFormSubmit() {
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
      
    } else {
      swal.fire({
        title: 'Update Inventory',
        text: 'Updating Inventory Failed',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      
    }

  }

  onClose() {
    this.bsModalRef.hide();
  }



}
