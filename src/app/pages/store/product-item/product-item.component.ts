import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoginService } from '../../../@service/auth/login.service';
import { apiUrl } from '../../../@service/service';
import { CategoryService } from '../../../@service/store/category.service';
import { IssueService } from '../../../@service/store/issue.service';
import { ItemService } from '../../../@service/store/item.service';
import { UnitService } from '../../../@service/store/unit.service';

@Component({
  selector: 'ngx-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  AddStockFormView: boolean = false;

  category: any;
  unit: any;
  item: any;

  NbDialogRef: any;

  ItemForm: FormGroup;
  AddStockForm: FormGroup;
  UploadItemForm: FormGroup;
  IssueForm: FormGroup;

  oldquantity: number;
  total: number;

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
      itemId: {
        title: 'ID',
        type: 'number',
      },
      itemName: {
        title: 'Item Name',
        type: 'number',
      },
      itemDescription: {
        title: 'Item Description',
        type: 'number',
      },
      catalogNo: {
        title: 'Catalog No',
        type: 'number',
      },
      drawingNo: {
        title: 'Drawing No',
        type: 'number',
      },
      frequency: {
        title: 'Frequency',
        type: 'number',
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },

      activation: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          if (cell == true) {
            return '<span class="cell_right1">Active</span>';
          } if (cell == false) {
            return '<span class="cell_right">Deactive</span>';
          }

        }
      }
    },
  };
  settingsMain = {
    actions:  {
        delete: false,
        add: false,
        edit: false,
        custom: [
          {
            name: 'Button',
            title: '<i class="nb-edit" title="Create Issue"></i>',
          }],
        position: 'right'
      },
    columns: {
      itemId: {
        title: 'ID',
        type: 'number',
      },
      itemName: {
        title: 'Item Name',
        type: 'number',
      },
      itemDescription: {
        title: 'Item Description',
        type: 'number',
      },
      catalogNo: {
        title: 'Catalog No',
        type: 'number',
      },
      drawingNo: {
        title: 'Drawing No',
        type: 'number',
      },
      frequency: {
        title: 'Frequency',
        type: 'number',
      },
      quantity: {
        title: 'Quantity',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          if (cell >= 0) {
            return '<span class="cell_right1">Available</span>';
          } else {
            return '<span class="cell_right">Not Available</span>';
          }

        }
      }
    },
  };
  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private postCategory: CategoryService,
    private _auth: LoginService,
    private post: IssueService,
    private postUnit: UnitService,
    private postItem: ItemService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    let role = this._auth.user.roles.find((x => x));
    let role_id = this._auth.user.userId;
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_MAINTENANCE') {
      this.maintanance = true;
    } else if (role == 'ROLE_STORE') {
      this.store = true;
    } else if (role == 'ROLE_GENERALMANAGER') {
      this.gm = true;
    }

    this.ItemForm = this.fb.group({
      itemName: ['', Validators.required],
      productCategory: this.fb.group({
        pid: ['', Validators.required]
      }),
      unit: this.fb.group({
        uid: ['', Validators.required]
      }),
      itemDescription: [null],
      drawingNo: [null],
      catalogNo: [null],
      frequency: [null],
      remainingItem: [null],
      quantity: [null],
      expiryDate: [null],
      paytax: [null],
      activation: [true],
      employe: this.fb.group({
        id: [role_id],
      })
    })

    this.AddStockForm = this.fb.group({
      itemId: [null, Validators.required],
      quantity: [null, Validators.required],
    })

    this.UploadItemForm = this.fb.group({
      file: [null, Validators.required]
    })

    this.IssueForm = this.fb.group({
      quantity: [null],
      description: [null],
      isRaised: [false],
      requiredDays: [null],
      storeItemModel: this.fb.group({
        itemId: [null],
      }),
      emp: this.fb.group({
        id: [role_id],
      })
    })

    this.postCategory.ViewCategory().subscribe(data => {
      this.category = data.Data;
    });

    this.postUnit.ViewUnit().subscribe(data => {
      this.unit = data.Data;
    });

    this.postItem.ViewItem().subscribe(data => {
      this.item = data.Data;
    });

  }

  onItemFormSubmit() {
    this.postItem.CreateItem(this.ItemForm.value).subscribe((data: any) => {
      this.ItemForm.reset();
      this.ngOnInit();
    })

  }

  ViewItemGet(event) {
    this.postItem.FindByIdItem(event).subscribe((data: any) => {
      this.oldquantity = data.Data.quantity;
      this.AddStockFormView = true;
    })
  }

  onIssueFormSubmit() {
    this.post.CreateIssue(this.IssueForm.value).subscribe((data: any) => {
      this.IssueForm.reset();
      this.NbDialogRef.close();
      this.ngOnInit();
    })
  }

  keyFunc(event) {
    this.total = parseInt(event.explicitOriginalTarget.value) + this.oldquantity;
  }

  onStockUpdateFormSubmit() {
    this.postItem.StockUpdateItem(this.AddStockForm.value.itemId, this.AddStockForm.value.quantity).subscribe((data: any) => {
      this.ngOnInit();
      this.AddStockFormView = false;
    })
  }

  createIssue(event,dialog) {
    this.IssueForm.get('storeItemModel').get('itemId').setValue(event.itemId);
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.UploadItemForm.get('file').setValue(file);
    }
    else {
      this.UploadItemForm.get('file').setValue(null);
    }
  }

  onUploadItemFormSubmit() {
    const formData = new FormData();
    formData.append("file", this.UploadItemForm.value.file);
    this.postItem.ItemUpload(formData).subscribe((data: any) => {
      // console.warn("done");
      // alert("Excel upload");
    }, (error: Error) => {
      // console.warn(error);
    })
  }

}
