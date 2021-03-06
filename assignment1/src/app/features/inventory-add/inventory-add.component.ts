import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})
export class InventoryAddComponent implements OnInit {

  /** Variables use for adding inventory */
  addNewPostForm = this.builder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    status: ['']

  });
  categories: any[] = [];
  submitted:boolean= false;
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder, private dataService: DataService, private bsModalRef: BsModalRef) {

    this.dataService.getInventory().subscribe((data:any) => {
      Object.assign(this.categories, data);
    }, error => { console.log('Error while gettig category data.'); });
  }
  ngOnInit() {

  }
  get f(){
    return this.addNewPostForm.controls;
  }
  /** Calling api to submit the details */
  onPostFormSubmit(){
    this.submitted=true;
    /** If the form is valid api is called here amd swal is fired and then data is added and updated*/
    if (this.addNewPostForm.valid) {
      this.dataService.addInventory(this.addNewPostForm.value).subscribe(data=>{
        console.log(data);
        if(data!=null && data!= undefined){
          swal.fire({
            title: 'Add Inventory',
            text: 'Added Inventory Succesfully',
            icon: 'success',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
          this.event.emit('OK');
          this.bsModalRef.hide();
        }
      });
      
    } 
    /**If form is invalid the below swal is fired */
    else {
      swal.fire({
        title: 'Add Inventory',
        text: 'Please fill all the required fileds',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      
    }
  
  }
  /**Closing the modal on close */
  onClose(){
    this.bsModalRef.hide();
  }



}