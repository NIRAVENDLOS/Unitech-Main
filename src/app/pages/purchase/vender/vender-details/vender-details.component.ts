import { Component, OnInit } from '@angular/core';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';

@Component({
  selector: 'ngx-vender-details',
  templateUrl: './vender-details.component.html',
  styleUrls: ['./vender-details.component.scss']
})
export class VenderDetailsComponent implements OnInit {


  source: any = [];
  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      vendorName: {
        title: 'vendor Name',
        type: 'string',
      },
      vendorAddress: {
        title: 'vendor Address',
        type: 'string',
      },
      vendorcode: {
        title: 'vendor Code',
        type: 'number',
      },
      gstno: {
        title: 'vendor GST',
        type: 'string',
      },
      panno: {
        title: 'vendor PAN No.',
        type: 'string',
      }
    },
  };

  constructor(private post: VenderService) { }

  ngOnInit(): void {
    this.post.ViewVender().subscribe(data => {
      this.source = data.Data;
    });
  }

}
