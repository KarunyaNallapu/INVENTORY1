import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventoryForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    status: ['', Validators.required]

  });

  constructor(private fb: FormBuilder, public http: DataService, public modalService: BsModalService) { }

  ngOnInit(): void {
    this.getData();
  }
  data: any;
  get f() {
    return this.inventoryForm.controls;
  }
  getData() {
    this.http.getInventory().subscribe((x: any) => {
      this.data = x
    })
  }
  
  addInventory() {
    this.status = 'add'
    this.http.addInventory(this.inventoryForm.value).subscribe((x: any) => {
      console.log("added")
      console.log(this.inventoryForm.value)
      this.data.push(this.inventoryForm.value);
      this.getData();
    })
  }

  status = '';


  editObjectId: any;
  submit() {
    if (this.status === 'edit') {
      this.updateInventory1();
    }
    if (this.status === 'add') {
      this.addInventory();
      this.inventoryForm.reset();
    }
  }

  updateInventory1() {
    this.http.updateInventory(this.editObjectId, this.inventoryForm.value).subscribe((x: any) => {
      console.log("updated")
      console.log(this.editObjectId,this.inventoryForm.value)
      this.data[this.editObjectId] = this.inventoryForm.value;

    })
  }
  updateEmployee(i: any) {
    this.status = 'edit'
    console.log(this.data[i],i,this.editObjectId)
    this.editObjectId=i
    this.data.map((d:any,x:any)=>{
      console.log(d,x)
      if(d.id === this.editObjectId+1){
        this.inventoryForm.patchValue(d)
      }
    })
  }


  deleteInventory(del: any) {
    console.log(del)
    this.http.deleteInventory(del).subscribe((x: any) => {
      this.data.splice(del, 1);

      console.log(this.data)
    })
    this.getData();
  }

  public modalRef!: BsModalRef;

  openModal(template: TemplateRef<any>, status: string) {
    this.status = status;
    console.log(this.status)
    this.modalRef = this.modalService.show(template);
  }

}
