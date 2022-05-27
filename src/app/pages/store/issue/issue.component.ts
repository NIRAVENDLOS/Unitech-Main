import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { concat } from 'rxjs';
import { LoginService } from '../../../@service/auth/login.service';
import { IndentService } from '../../../@service/store/indent.service';
import { IssueService } from '../../../@service/store/issue.service';
import { ItemService } from '../../../@service/store/item.service';
import { ResponceService } from '../../../@service/store/responce.service';

@Component({
  selector: 'ngx-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  IssueForm: FormGroup;
  IssueOpenForm: FormGroup;
  ResponceForm: FormGroup;
  ResponceFormIndent: FormGroup;
  IndentForm: FormGroup;

  NbDialogRef: any;
  NbDialogRef1: any;
  NbDialogRef2: any;
  NbDialogRef3: any;

  statusChangeIssue: any;
  item: any;
  IssueSource: any = [];
  PENDINGIssueSource: any = [];
  ACCEPTIssueSource: any = [];
  DONEIssueSource: any = [];
  REJECTIssueSource: any = [];
  CANCELIssueSource: any = [];
  OPENIssueSource: any = [];

  PENDINGsettings = {
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
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ACCEPTsettings = {
    actions: false,
    columns: {
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
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
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
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
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  CANCELsettings = {
    actions: false,
    columns: {
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  OPENsettings = {
    actions: false,
    columns: {
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  OPENsettingsMain = {
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
      issueId: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      storeItemModel: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      requiredDays: {
        title: 'Required Days',
        type: 'number',
      },
      issueDate: {
        title: 'Issue Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private _auth: LoginService,
    private post: IssueService,
    private postIndent: IndentService,
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
    }

    this.postResponce.ViewResponce().subscribe((data: any) => {
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
    this.IssueOpenForm = this.fb.group({
      quantity: [null],
      coments: [null, Validators.required],
      remarks: [null],
      issueId: [null]
    })

    this.ResponceForm = this.fb.group({
      resStatus: ['ISSUE'],
      pdiId: [null],
      issueStatus: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentRaised: [false],
      poRaised: [false],
      doRaised: [false],
      employe: this.fb.group({
        id: [role_id]
      })
    })

    this.IndentForm = this.fb.group({
      storeItem: this.fb.group({
        itemId: [null]
      }),
      employee: this.fb.group({
        id: [role_id]
      }),
      issue: this.fb.group({
        issueId: [null]
      }),
      quantity: [null],
      estimatedPrice: [null]
    })

    this.ResponceFormIndent = this.fb.group({
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

    this.postItem.ViewItem().subscribe(data => {
      this.item = data.Data;
    });
    this.post.ViewIssue().subscribe((data => {
      this.IssueSource = data.Data;
    }))

    this.post.ViewIssueStatus('PENDING').subscribe((data => {
      this.PENDINGIssueSource = data.Data;
    }));
    this.post.ViewIssueStatus('ACCEPT').subscribe((data => {
      this.ACCEPTIssueSource = data.Data;
    }));
    this.post.ViewIssueStatus('DONE').subscribe((data => {
      this.DONEIssueSource = data.Data;
    }));
    this.post.ViewIssueStatus('REJECT').subscribe((data => {
      this.REJECTIssueSource = data.Data;
    }));
    this.post.ViewIssueStatus('CANCEL').subscribe((data => {
      this.CANCELIssueSource = data.Data;
    }));
    this.post.ViewIssueStatus('OPEN').subscribe((data => {
      this.OPENIssueSource = data.Data;
    }));
  }

  createIssue(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }
  onIssueFormSubmit() {
    this.post.CreateIssue(this.IssueForm.value).subscribe((data: any) => {
      this.IssueForm.reset();
      this.NbDialogRef.close();
      this.ngOnInit();
    })
  }

  onChangeIssueStatus(event, dialog1) {
    this.statusChangeIssue = null;
    this.statusChangeIssue = event;
    this.IssueOpenForm.get('quantity').setValue(event.quantity);
    this.IssueOpenForm.get('issueId').setValue(event.issueId);
    this.NbDialogRef1 = this.dialogService.open(
      dialog1,
      {
        closeOnBackdropClick: false,
      });
  }

  onChangeIssueCloseStatus(event, dialog2) {
    this.statusChangeIssue = null;
    this.statusChangeIssue = event;
    this.IssueOpenForm.get('quantity').setValue(event.quantity);
    this.IssueOpenForm.get('issueId').setValue(event.issueId);
    this.NbDialogRef2 = this.dialogService.open(
      dialog2,
      {
        closeOnBackdropClick: false,
      });
  }

  issueOpen() {
    let Opendata = {
      'quantity': this.IssueOpenForm.value.quantity,
      'status': 'OPEN'
    }
    this.post.StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata).subscribe((data: any) => {

      this.ResponceForm.get('coments').setValue(this.IssueOpenForm.value.coments);
      this.ResponceForm.get('remarks').setValue(this.IssueOpenForm.value.remarks);
      this.ResponceForm.get('issueStatus').setValue("PENDING");
      this.ResponceForm.get('pdiId').setValue(this.IssueOpenForm.value.issueId);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef1.close();
        this.ngOnInit();

      })
    })
  }

  issueReject() {
    let Opendata = {
      'quantity': this.IssueOpenForm.value.quantity,
      'status': 'REJECT'
    }
    this.post.StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata).subscribe((data: any) => {
      this.ResponceForm.get('coments').setValue(this.IssueOpenForm.value.coments);
      this.ResponceForm.get('remarks').setValue(this.IssueOpenForm.value.remarks);
      this.ResponceForm.get('issueStatus').setValue("PENDING");
      this.ResponceForm.get('pdiId').setValue(this.IssueOpenForm.value.issueId);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef1.close();
        this.ngOnInit();
      })
    })
  }

  issueCancel() {
    let Opendata = {
      'quantity': this.IssueOpenForm.value.quantity,
      'status': 'CANCEL'
    }
    this.post.StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata).subscribe((data: any) => {
      this.ResponceForm.get('coments').setValue(this.IssueOpenForm.value.coments);
      this.ResponceForm.get('remarks').setValue(this.IssueOpenForm.value.remarks);
      this.ResponceForm.get('issueStatus').setValue("PENDING");
      this.ResponceForm.get('pdiId').setValue(this.IssueOpenForm.value.issueId);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef1.close();
        this.ngOnInit();

      })
    })
  }

  issueClose() {
    let Opendata = {
      'quantity': this.IssueOpenForm.value.quantity,
      'status': 'DONE'
    }
    this.post.StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata).subscribe((data: any) => {
      this.ResponceForm.get('coments').setValue(this.IssueOpenForm.value.coments);
      this.ResponceForm.get('remarks').setValue(this.IssueOpenForm.value.remarks);
      this.ResponceForm.get('issueStatus').setValue("OPEN");
      this.ResponceForm.get('pdiId').setValue(this.IssueOpenForm.value.issueId);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.NbDialogRef2.close();
        this.ngOnInit();

      })
    })
  }

  
  IndentCreate(dialog3: TemplateRef<any>) {
    console.warn(this.statusChangeIssue);
    this.IndentForm.get('storeItem').get('itemId').setValue(this.statusChangeIssue.storeItemModel.itemId);
    this.IndentForm.get('issue').get('issueId').setValue(this.statusChangeIssue.issueId);
    this.IndentForm.get('quantity').setValue(this.statusChangeIssue.quantity);
    console.warn(this.IndentForm.value);
    this.NbDialogRef1.close();
    this.NbDialogRef3 = this.dialogService.open(
      dialog3,
      {
        closeOnBackdropClick: false,
      });
  }

  onIndentFormSubmit() {
    this.postIndent.CreateIndent(this.IndentForm.value).subscribe((data: any) => {
      
      this.ResponceFormIndent.get('coments').setValue("create indent");
      this.ResponceFormIndent.get('remarks').setValue("create indent");
      this.ResponceFormIndent.get('pdiId').setValue(data.Data.indentId);
      this.postResponce.CreateResponce(this.ResponceFormIndent.value).subscribe((data: any) => {
        this.NbDialogRef3.close();
        this.ngOnInit();
      })
    })
  }

}
