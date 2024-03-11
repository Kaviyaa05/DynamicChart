import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { ChartProviderService } from '../chart-provider.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.css'
})
export class DynamicComponent implements OnInit{

  cardList:any=[]
  currentCard:any=1;
  tableParams:any=[]
  chartOptions:any;

  constructor(private service:ChartService,private chart:ChartProviderService) {
  }

  ngOnInit(): void {
    // this.tableParams=this.service.getData();
    //   this.service.chartData.subscribe((data:any) => {
    //     this.tableParams=data;
    //   })
    //   console.log("dynamic",this.tableParams)
  }

  GenerateChart()
  {
   this.chartOptions= this.chart.generateChart();
   console.log("Hello",this.chartOptions)
  }
  Add()
  {
    this.cardList.push(this.currentCard)
    this.currentCard++;
  }

}
