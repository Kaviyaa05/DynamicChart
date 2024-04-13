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
  currentCardName:any;
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
    this.currentCard=this.cardList.length+1;
  }

  GenerateChart(chartName: string, cardIndex: number): void {
    const selectedChart = this.tableParams.find(chart => chart.chartName === chartName);
    console.log("sele", selectedChart);
    if (selectedChart) {
      console.log("daaataa", selectedChart);
      this.chartProvider.generateChart(selectedChart).subscribe(
        (chartOptions: any) => {
          this.chartOptions[cardIndex] = chartOptions;
          localStorage.setItem("chartOptions",JSON.stringify(this.chartOptions));
          this.currentCardName[cardIndex]=selectedChart.chartName;
          localStorage.setItem("currentCardName",JSON.stringify(this.currentCardName));
          
        },
        (error: any) => {
          console.error('Error generating chart:', error);
        }
      );
    } else {
      console.error('Chart not found.');
    }
    console.log(this.chartOptions);
  }
  
  Add(): void {
    this.cardList.push(this.currentCard);

    localStorage.setItem("cards",JSON.stringify(this.cardList));
    this.currentCard++;

  }

  DeleteCard()
  {
    if(this.chartOptions.length!=this.cardList.length )
    {
      this.cardList.pop()
      localStorage.setItem("cards",JSON.stringify(this.cardList));
      
    }
    else if(this.chartOptions.length==this.cardList.length)
    {
      this.chartOptions.pop()
      localStorage.setItem("chartOptions",JSON.stringify(this.chartOptions));
      this.currentCardName.pop()
      localStorage.setItem("currentCardName",JSON.stringify(this.currentCardName));
      this.cardList.pop()
      localStorage.setItem("cards",JSON.stringify(this.cardList));
    }
    
    this.currentCard--;
  }

}