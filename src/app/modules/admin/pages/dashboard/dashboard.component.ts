import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiStage } from 'src/app/models/multi-stage';
import { ehsStages } from 'src/app/statics/constants';
import { ApexFill, ApexStroke, ApexPlotOptions, ApexChart, ChartComponent } from 'ng-apexcharts';
import { Stack } from 'src/app/models/stack';
import { productivityData } from 'src/app/statics/productivity-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartObj', { static: false }) chartObj: ChartComponent;
  public currentLocation: string[] = ['Home', 'Dashboard'];
  public pageName = 'Dashboard';
  public ehsStages: MultiStage[] = ehsStages;
  public productivityData: Stack[] = productivityData;
  chartEnabled = false;
  chart: ApexChart = {
    height: 350,
    width: 350,
    offsetX: 0,
    offsetY: 0,
    type: 'radialBar',
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 5000
      },
      dynamicAnimation: {
        enabled: true,
        speed: 800
      }
    }
  }

  fill: ApexFill = {
    type: 'image',
    opacity: 1,
    image: {
      src: ['/assets/images/radial.jpg'],
      width: 350,
      height: 350
    }
  }

  series = [75]
  stroke: ApexStroke = {
    lineCap: 'round',
  }

  labels = ['Percent']

  plotOptions: ApexPlotOptions = {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
       hollow: {
        margin: 0,
        size: '70%',
        background: 'rgba(255, 255, 255, 0.1)',
        image: undefined,
        offsetX: 0,
        offsetY: 0,
        position: 'front',
      },
      track: {
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 5,
          opacity: 0.4
        }
      },

      dataLabels: {
        name: {
          offsetY: -25,
          show: true,
          color: '#888',
          fontSize: '10px'
        },
        value: {
          formatter: (val) => String(val),
          color: '#FFF',
          fontSize: '70px',
          show: true,
        }
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.chartEnabled = true;
    }, 1000)
  }

}
