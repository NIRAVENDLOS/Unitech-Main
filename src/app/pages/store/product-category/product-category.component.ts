import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { CategoryService } from '../../../@service/store/category.service';
import { UserService } from '../../../@service/user/user.service';

@Component({
  selector: 'ngx-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {


  source: any = [];
  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  settings = {
    actions: false,
    // {
    //   delete: false,
    //   add: false,
    //   edit: false,
    //   custom: [
    //     {
    //       name: 'Button',
    //       title: '<i class="nb-edit" title="View"></i>',
    //     }],
    //   position: 'right'
    // },

    columns: {
      pid: {
        title: 'ID',
        type: 'number',
      },
      productName: {
        title: 'Product Category',
        type: 'string',
      },
    
      // address: {
      //   title: 'Status',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => {
      //     if(cell == 'Rajkot') {
      //       return '<span class="cell_right">' + cell + '</span>';
      //     } if (cell == 'ahmedabad') {
      //       return '<span class="cell_right1">' + cell + '</span>';
      //     }
         
      //   }
      // }
    },
  };



  CategoryForm: FormGroup;
  NbDialogRef = null;

  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private post: CategoryService,
    private _auth: LoginService,
  ) { }

  ngOnInit(): void {

    let role = this._auth.user.roles.find((x => x));
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_MAINTENANCE') {
      this.maintanance = true;
    } else if (role == 'ROLE_STORE') {
      this.store = true;
    } else if (role == 'ROLE_GENERALMANAGER') {
      this.gm = true;
    }

    this.CategoryForm = this.fb.group({
      productName: ['', Validators.required],
    })

    this.post.ViewCategory().subscribe(data => {
      this.source = data.Data;
        console.warn(data);
    });


  }

  addCategory(dialog: TemplateRef<any>) {
    this.CategoryForm.reset();
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  onCategoryFormSubmit() {
    
    this.post.CreateCategory(this.CategoryForm.value).subscribe((data: any) => {
      this.CategoryForm.reset();
      alert('category Done');
      this.NbDialogRef.close();
      this.ngOnInit();
    });
    
  }

}
