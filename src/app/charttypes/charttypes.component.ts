import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas'; 
import { ChartService } from '../chart.service';
import { ChartProviderService } from '../chart-provider.service';

enum ChartType {
  VerticalBar = 'bar',
  HorizontalBar = 'horizontalBar',
  StackedBar = 'stackedBar',
  HorizontalStackedBar = 'horizontalstackedBar',
  Line = 'line',
  Pie = 'pie'
}

@Component({
  selector: 'app-charttypes',
  templateUrl: './charttypes.component.html',
  styleUrls: ['./charttypes.component.css']
})
export class CharttypesComponent implements AfterViewInit {

  chartOptions: any;
   editingChartData: any = null;
  selectedChartType: ChartType = ChartType.VerticalBar;
  // isHorizontal: boolean = false;
  // isStacked: boolean = false;
  editorOptions = {
    theme: 'vs-dark',
    language: 'json'
  };
  apiResponse :string= ''; // Initialize your model

  constructor(private router: Router,private route: ActivatedRoute, private chartService: ChartService,private service:ChartProviderService) {
   
  }

  @ViewChild('xAxisInput') xAxisInput!: ElementRef;
  @ViewChild('yAxisInput') yAxisInput!: ElementRef;
  @ViewChild('apiUrlInput') apiUrlInput!: ElementRef;
  @ViewChild('chartTypeSelect') chartTypeSelect!: ElementRef;
  @ViewChild('chartContainer') chartContainer!: ElementRef;
@ViewChild('chartName') chartName!:ElementRef;
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

  

  ngAfterViewInit(): void {
    this.editingChartData = this.chartService.getSelectedChartData();
    console.log("service",this.editingChartData)
    if (this.editingChartData!=null) {
      this.populateForm();
      console.log("edit",this.editingChartData);
      
     
    }
    else{
      console.log("reset",this.editingChartData)
      this.resetForm();
    }
  }
    // this.route.paramMap.subscribe(params => {
    //   const chartData=this.router?.getCurrentNavigation()?.extras.state?.['chartData'];
    //   if (chartData) {
    //     this.editingChartData = chartData;
    //     this.populateForm();
    //   } 
    // });
    

  populateForm(): void {
    if (this.editingChartData) {
      this.xAxisInput.nativeElement.value = this.editingChartData.xAxisValues.join(',');
      this.yAxisInput.nativeElement.value = this.editingChartData.yAxisValues.join(',');
      this.apiUrlInput.nativeElement.value = this.editingChartData.apiUrl;
     
      this.chartTypeSelect.nativeElement.value=this.editingChartData.selectedChartType;
      this.chartName.nativeElement.value=this.editingChartData.chartName;
      this.selectedChartType= this.chartTypeSelect.nativeElement.value;
    }
  
  }
  resetForm():void{
    this.apiUrlInput.nativeElement.value='';
    this.xAxisInput.nativeElement.value='';
    this.yAxisInput.nativeElement.value='';
    this.chartTypeSelect.nativeElement.value=ChartType.VerticalBar;
    this.chartName.nativeElement.value='';
  }
  // generateChart()
  // {
  //   this.chartOptions=this.service.generateChart();
  // }
  generateChart(): void {
    const xAxisValues = this.xAxisInput.nativeElement.value.split(',');
    const yAxisValues = this.yAxisInput.nativeElement.value.split(',');
    const apiUrl = this.apiUrlInput.nativeElement.value;
   

    if (!apiUrl || xAxisValues.length === 0 || yAxisValues.length === 0) {
      console.log('Please provide values for API URL, X-axis, and Y-axis.');
      return;
    }
   
    this.chartService.getChartData(apiUrl).subscribe(
      (data: any[]) => {
        console.log("data",data);
        const transformedData = data.map((item: any) => ({
          x: xAxisValues.map((key: string) => item[key]),
          y: yAxisValues.map((key: string) => item[key])
        }));
        this.apiResponse=JSON.stringify(transformedData,null, 2)
        const selectedChartOptions = this.chartTypeMap[this.selectedChartType];
        if (selectedChartOptions) {
          // console.log("came")
          this.chartOptions = {
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
            this.chartOptions.series=transformedData.map(item => parseFloat(item.y))
          }
         
        } else {
          console.error('Invalid chart type selected.');
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onChartTypeChange(event: any): void {
    this.selectedChartType = event.target.value;
  
  }

  // goToTable(): void {
  //   this.router.navigate(['/table']);
  // }
  

  saveChartParams(): void {
    const selectedChartParams = {
      apiUrl: this.apiUrlInput.nativeElement.value,
      xAxisValues: this.xAxisInput.nativeElement.value.split(','),
      yAxisValues: this.yAxisInput.nativeElement.value.split(','),
      selectedChartType: this.chartTypeSelect.nativeElement.value,
      chartName:this.chartName.nativeElement.value
     
    };
      // localStorage.setItem('selectedChartParams', JSON.stringify(selectedChartParams));
      if(this.editingChartData!=null){
        console.log("hiiooo")
                const index=this.chartService.getData().findIndex((chart:any)=>chart.chartName===this.editingChartData.chartName);
                console.log("eeeeeeeee",this.editingChartData);
                console.log("num",index);
                    if(index !== -1){
                      console.log("num",index)
                      console.log("eeeeeeeinsideee",this.editingChartData);
                      this.chartService.getData()[index]=selectedChartParams;
                      console.log("chart data gets updated.");
                     
                      this.resetForm()
                    }
                  }
                  else{
                    this.chartService.setData(selectedChartParams);
                    console.log("New chart added");
                  }  
                  this.router.navigate(['/table']);
  }
  
}

