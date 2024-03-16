import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { ChartProviderService } from '../chart-provider.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.css'
})
export class DynamicComponent implements OnInit{

  cardList: any[] = [];
  currentCard: number = 1;
  tableParams: any[] = [];
  chartOptions: any;
  currentCardName:string='';
  chartOptionsMap:{[key:string]:any}={};

  constructor(private service:ChartService,private chartProvider:ChartProviderService) {
  }

  ngOnInit(): void {
    this.tableParams = this.service.getData();
    this.service.chartData.subscribe((data: any) => {
      this.tableParams = data;
    });
    this.cardList=JSON.parse(localStorage.getItem("cards")||"[]");
    this.chartOptions=JSON.parse(localStorage.getItem("chartOptions")||"[]");
    this.currentCardName=JSON.parse(localStorage.getItem("currentCardName")||"[]");
    this.currentCard=this.cardList.length;
  }

  GenerateChart(chartName: string): void {
    const selectedChart = this.tableParams.find(chart => chart.chartName === chartName);
    if (selectedChart) {
      console.log("daaataa", selectedChart);
      this.chartProvider.generateChart(selectedChart).subscribe(
        (chartOptions: any) => {
          this.chartOptions = chartOptions;
          localStorage.setItem("chartOptions",JSON.stringify(this.chartOptions));
          this.currentCardName=selectedChart.chartName;
          localStorage.setItem("currentCardName",JSON.stringify(this.currentCardName));
          
        },
        (error: any) => {
          console.error('Error generating chart:', error);
        }
      );
    } else {
      console.error('Chart not found.');
    }
  }
  
  Add(): void {
    this.cardList.push(this.currentCard);
    localStorage.setItem("cards",JSON.stringify(this.cardList));
    this.currentCard++;

  }

}
