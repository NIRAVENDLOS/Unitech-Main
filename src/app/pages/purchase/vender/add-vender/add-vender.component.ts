import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';

@Component({
  selector: 'ngx-add-vender',
  templateUrl: './add-vender.component.html',
  styleUrls: ['./add-vender.component.scss']
})
export class AddVenderComponent implements OnInit {

  venderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private venderService: VenderService
  ) { }

  ngOnInit(): void {
    this.venderForm = this.fb.group({
      vendorName: ['',Validators.required],
      vendorAddress: ['',Validators.required],
      vendorcode: ['',[Validators.required,Validators.pattern]],
      gstno: [''],
      panno: [''],
    });
  }

  onVenderSubmit() {
    this.venderService.CreateVender(this.venderForm.value).subscribe((data:any) => {
      alert("data successfully uploaded");
      this.venderForm.reset();
    },
    (Error: any) => {
      alert("data not uploaded");
    })
  }
}
