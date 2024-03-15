import { Injectable, OnInit } from '@angular/core';
import { ChartService } from './chart.service';
import { Observable } from 'rxjs';

enum ChartType {
  VerticalBar = 'bar',
  HorizontalBar = 'horizontalBar',
  StackedBar = 'stackedBar',
  HorizontalStackedBar = 'horizontalstackedBar',
  Line = 'line',
  Pie = 'pie'
}

@Injectable({
  providedIn: 'root'
})
export class ChartProviderService implements OnInit {
  tableParams:any=[]
  selectedChartType: ChartType = ChartType.VerticalBar;
  chartOptions: any;
  chartIndex:any=0;
  chartNames:any=[]
  chartParams:any= {};
  transformedData:any

  constructor(private service:ChartService) { this.tableParams=this.service.getData();
    this.service.chartData.subscribe((data:any) => {
      this.tableParams=data;
    })
    // this.generateChart();
    console.log("chart",this.chartNames)
// this.setParams();
// this.service.getChartData(this.chartParams.apiUrl).subscribe(
//   (data: any[]) => {
//     console.log("data",data);
//     this.transformedData = data.map((item: any) => ({
//       x: this.chartParams.xAxisValues.map((key: string) => item[key]),
//       y:this.chartParams.yAxisValues.map((key: string) => item[key])
//     }));
// })
    
}
  ngOnInit(): void {
  }

  // setParams()
  // {
  //   this.chartParams={
  //     xAxisValues :this.tableParams[this.chartIndex]?.xAxisValues,
  //    yAxisValues : this.tableParams[this.chartIndex]?.yAxisValues,
  //     apiUrl :this.tableParams[this.chartIndex]?.apiUrl,
  //    selectedChartType:this.tableParams[this.chartIndex]?.selectedChartType,
  //     chartName:this.tableParams[this.chartIndex]?.chartName
  //   }
  //   this.chartIndex++
  //   console.log(this.chartIndex)
  // }

  chartTypeMap = {
    [ChartType.VerticalBar]: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    },
    [ChartType.HorizontalBar]: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      }
    },
    [ChartType.StackedBar]: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    },
    [ChartType.HorizontalStackedBar]: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      }
    },
    [ChartType.Line]: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
    },
    [ChartType.Pie]: {
      chart: {
        type: 'pie',
        width: 400
      },
      responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                show: false
            }
        }
      }],
      colors: ['#D5255E', '#F88FB2', '#831246', '#ED5C8B'],
      
      
    }
  };

 
  generateChart(chartParams: any):Observable< any >{
return new Observable(observer=>{
    const apiUrl = chartParams.apiUrl;
    const xAxisValues =chartParams.xAxisValues;
    const yAxisValues = chartParams.yAxisValues
   
    this.selectedChartType=chartParams.selectedChartType;
    

    if (!apiUrl || xAxisValues.length === 0 || yAxisValues.length === 0) {
      console.log('Please provide values for API URL, X-axis, and Y-axis.');
      return;
    }
    this.service.getChartData(apiUrl).subscribe(
      (data: any[]) => {
        console.log("dataapi",data);
        const transformedData = data.map((item: any) => ({
          x: xAxisValues.map((key: string) => item[key]),
          y: yAxisValues.map((key: string) => item[key])
        }));
        console.log("td",transformedData);
        const selectedChartOptions = this.chartTypeMap[this.selectedChartType];
        if (selectedChartOptions) {
          console.log("hi1")
          const chartOptions = {
           
            series: transformedData[0].y.map((_: any, index: number) => ({
              name: yAxisValues[index],
              data: transformedData.map((item: any) => parseFloat(item.y[index]))
             
            })),
          
            ...selectedChartOptions, 
            
            dataLabels: {
              enabled: false
            },
            yaxis: {
              title: {
                text: yAxisValues.join(' / ')
              },
            },
            xaxis: {
              title: {
                text: xAxisValues
              },

              categories:transformedData.map((item: { x: any[]; }) => item.x.join(', '))
            },
            legend:{
              position:"right",
             
             },
            labels: 
               transformedData.map((item: { x: any[]; }) => item.x.join(', '))
             
          };
          if(selectedChartOptions.chart.type=='pie')
          {
            chartOptions.series=transformedData.map((item: { y: string; }) => parseFloat(item.y))
          }  console.log("chartOptions",this.chartOptions)
          observer.next(chartOptions);
        observer.complete();
        
        } else {
          console.error('Invalid chart type selected.');
          observer.error("Invalid chart type selected")
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        observer.error("Error fetching data");
      }
    );
  
  
  });
}
}
