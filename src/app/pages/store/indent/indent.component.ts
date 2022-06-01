import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { IndentService } from '../../../@service/store/indent.service';
import { ItemService } from '../../../@service/store/item.service';
import { ResponceService } from '../../../@service/store/responce.service';

@Component({
  selector: 'ngx-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.scss']
})
export class IndentComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;

  NbDialogRef: any;
  NbDialogRef1: any;
  NbDialogRef2: any;

  IndentForm: FormGroup;
  IndentOpenForm: FormGroup;
  ResponceForm: FormGroup;
  item: any;

  tax: any;
  total: any;

  ResponceSource: any = [];
  IndentSource: any = [];
  VPIndentSource: any = [];
  ADMINIndentSource: any = [];
  ACCOUNTIndentSource: any = [];
  REJECTIndentSource: any = [];
  DONEIndentSource: any = [];

  VPsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ADMINsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  VPONLYsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ADMINONLYsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ACCOUNTsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ACCOUNTONLYsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  REJECTsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  DONEsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Total Price',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  Responcesettings = {
    actions: false,
    columns: {
      rid: {
        title: 'ID',
        type: 'number',
      },
      employe: {
        title: 'Employee Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.employe.username
        },
      },
      coments: {
        title: 'Comments',
        type: 'string',
      },
      remarks: {
        title: 'Remarks',
        type: 'string',
      },
      created: {
        title: 'Indent Responce Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      issueStatus: {
        title: 'Indent Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private _auth: LoginService,
    private fb: FormBuilder,
    private post: IndentService,
    private postItem: ItemService,
    private postResponce: ResponceService
  ) { }

  ngOnInit(): void {
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
    } else if (role == 'ROLE_ACCOUNT') {
      this.account = true;
    }

    this.IndentForm = this.fb.group({
      storeItem: this.fb.group({
        itemId: [null]
      }),
      employee: this.fb.group({
        id: [role_id]
      }),
      issueItem: this.fb.group({
        issueId: [null]
      }),
      quantity: [null],
      estimatedPrice: [null]
    })

    this.ResponceForm = this.fb.group({
      resStatus: ['INDENT'],
      pdiId: [null],
      issueStatus: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentRaised: [true],
      poRaised: [false],
      doRaised: [false],
      employe: this.fb.group({
        id: [role_id]
      })
    })

    this.IndentOpenForm = this.fb.group({
      quantity: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentId: [null]
    })

    this.postItem.ViewItem().subscribe(data => {
      this.item = data.Data;
    });
    this.post.ViewIndent().subscribe(data => {
      this.IndentSource = data.Data;
    });
    this.post.ViewIndentStatus('GM').subscribe(data => {
      this.VPIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('ADMIN').subscribe(data => {
      this.ADMINIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('ACCOUNT').subscribe(data => {
      this.ACCOUNTIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('REJECT').subscribe(data => {
      this.REJECTIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('DONE').subscribe(data => {
      this.DONEIndentSource = data.Data;
    });

  }

  createIndent(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  ItemPriceTotal(event) {
    console.warn(event);
    this.IndentForm.get('estimatedPrice').setValue(null);
    this.IndentForm.get('quantity').setValue(null);
    this.tax = null;
    this.total = null;
    this.postItem.FindByIdItem(event).subscribe((data: any) => {
      this.tax = data.Data.paytax;
    })
  }

  taxToatal(event) {
    console.warn(this.IndentForm.value.quantity);
    let price = event.target.value;
    let quantity = this.IndentForm.value.quantity;
    if(this.tax != null && price != null && quantity != null) {
      this.total = (quantity * price * this.tax / 100) + quantity * price;
    }
  }
  taxToatalQantity(event) {
    let price = this.IndentForm.value.estimatedPrice;
    let quantity = event.target.value;
    if(this.tax != null && price != null && quantity != null) {
      this.total = (quantity * price * this.tax / 100) + quantity * price;
    }
  }

  onIndentFormSubmit() {
    this.post.CreateIndent(this.IndentForm.value).subscribe((data: any) => {
      
      this.ResponceForm.get('coments').setValue("create indent");
      this.ResponceForm.get('remarks').setValue("create indent");
      this.ResponceForm.get('pdiId').setValue(data.Data.indentId);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef.close();
        this.ngOnInit();
      })
    })
  }

  onChangeIndentStatus(event,dialog) {
    console.warn(event);
    this.IndentOpenForm.get('indentId').setValue(event.indentId);
    this.NbDialogRef1 = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  onChangeIndentViewStatus(event,dialog) {
    console.warn(event);
    this.postResponce.ViewByStatusResponce('INDENT', event.indentId).subscribe((data: any) => {
      console.warn(data);
      this.ResponceSource = data.Data;
    })
    this.NbDialogRef2 = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  indentOpen() {
    this.ResponceForm.get('coments').setValue(this.IndentOpenForm.value.coments);
    this.ResponceForm.get('remarks').setValue(this.IndentOpenForm.value.remarks);
    this.ResponceForm.get('pdiId').setValue(this.IndentOpenForm.value.indentId);

    let Opendata = null;
    if(this.admin) {
      Opendata = {
        'indentStatus': 'ACCOUNT'
      }
      this.ResponceForm.get('issueStatus').setValue("ADMIN");
    } 
    else if(this.gm) {
      Opendata = {
        'indentStatus': 'ADMIN'
      }
      this.ResponceForm.get('issueStatus').setValue("GM");
    } 
    else if(this.account) {
      Opendata = {
        'indentStatus': 'DONE'
      }
      this.ResponceForm.get('issueStatus').setValue("ACCOUNT");
    } 
    // console.warn(Opendata);

    this.post.StatusUpdateIndent(this.IndentOpenForm.value.indentId, Opendata).subscribe((data: any) => {
      // console.warn(data);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef1.close();
        this.ngOnInit();
      })
    });
}

  indentReject() {
    this.ResponceForm.get('coments').setValue(this.IndentOpenForm.value.coments);
    this.ResponceForm.get('remarks').setValue(this.IndentOpenForm.value.remarks);
    this.ResponceForm.get('pdiId').setValue(this.IndentOpenForm.value.indentId);

    let Opendata = null;
    if(this.admin) {
      Opendata = {
        'indentStatus': 'REJECT'
      }
      this.ResponceForm.get('issueStatus').setValue("ADMIN");
    } 
    else if(this.gm) {
      Opendata = {
        'indentStatus': 'REJECT'
      }
      this.ResponceForm.get('issueStatus').setValue("GM");
    } 
    
    // console.warn(Opendata);

    this.post.StatusUpdateIndent(this.IndentOpenForm.value.indentId, Opendata).subscribe((data: any) => {
      // console.warn(data);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef1.close();
        this.ngOnInit();
      })
    });
  }
}

