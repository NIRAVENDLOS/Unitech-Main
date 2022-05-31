import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../../@service/auth/login.service';
import { IssueService } from '../../../@service/store/issue.service';

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  deptName: any = [
    "bloowroom",
    "carding",
    "drawframe",
    "finisher",
    "speedframe",
    "comber",
    "lapformer",
    "ringframe",
    "winding",
    "packing",
    "utility",
    "wasteroom",
  ];

  DepartmentIndent: any;
  IndentForm: FormGroup;
  Source: any = [];
  settings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.issueId;
        },
      },
      description: {
        title: "Description",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.description;
        },
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.quantity;
        },
      },
      // requiredDays: {
      //   title: "Required Days",
      //   type: "number",
      // },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(row.issuedItem.issueDate).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + row.issuedItem.status + "</span>";
        },
      },
    },
  };

  constructor(
    private post: IssueService,
    private fb: FormBuilder,
    private _auth: LoginService,
  ) { }

  ngOnInit() {
    this.IndentForm = this.fb.group({
      departmentName: [null]
    })
    this.post.ViewUsageItem().subscribe((data => {
      console.warn(data);
    }));
  }


  chengeDepartmentName(event) {
    // console.warn(event);
    this.post.ViewDepartUsageItem(event).subscribe((data => {
      console.warn(data.Data);
      this.Source = data.Data;
    }))
  }
}
