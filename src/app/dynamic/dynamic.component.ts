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
  currentCard: any = 1;
  tableParams: any[] = [];
  chartOptions: any;

  constructor(private service:ChartService,private chartProvider:ChartProviderService) {
  }

  ngOnInit(): void {
    this.tableParams = this.service.getData();
    this.service.chartData.subscribe((data: any) => {
      this.tableParams = data;
    });
    
      this.cardList=JSON.parse(localStorage.getItem("card")|| '[]')
      this.chartOptions=JSON.parse(localStorage.getItem("options") || "[]")
      this.currentCard=this.cardList.length+1;
  }

  GenerateChart(chartName: string, cardIndex: number): void {
    const selectedChart = this.tableParams.find(chart => chart.chartName === chartName);
    console.log("sele", selectedChart);
    if (selectedChart) {
      // Update the chartOptions array at the specific index corresponding to the card
      this.chartOptions[cardIndex] = this.chartProvider.generateChart(selectedChart);
      localStorage.setItem("options", JSON.stringify(this.chartOptions));
    } else {
      console.error('Chart not found.');
    }
    console.log(this.chartOptions);
  }
  Add(): void {
    this.cardList.push(this.currentCard);
    localStorage.setItem("card",JSON.stringify(this.cardList))
    this.currentCard++;
  }

}
