import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import {Chart} from 'chart.js';
import html2canvas from 'html2canvas';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  capturedImage;
  chart = [];

  constructor() {
  }

  ngOnInit(): void {
    this.chart = new Chart('canvas',{
      type: 'doughnut',
      data: {
        labels: ['a','b','c','d','e','f','g'],
        datasets: [
          {
          label: 'First',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          fill: false,
          }]
      }
    });

    this.chart = new Chart('canvas1',{
      type: 'pie',
      data: {
        labels: ['Red','Green','Yellow','Grey','Blue'],
        datasets: [
          {
          label: 'First',
          data: [11, 16, 7, 3, 14],
          backgroundColor:  [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ],
          fill: false,
          }]
      }
    });

    this.chart = new Chart('canvas2',{
      type: 'radar',
      data: {
        labels: ['Red','Green','Yellow','Grey','Blue'],
        datasets: [
          {
          label: 'First',
          data: [11, 16, 7, 3, 14],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
          fill: true,
          }]
      }
    });

  }

  image(image:string) {
    alert('image');
    html2canvas(document.querySelector(image)).then((canvas) => {
      this.capturedImage = canvas.toDataURL();
      var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'somefilename.jpg';
        a.click();
    });
  }
}
