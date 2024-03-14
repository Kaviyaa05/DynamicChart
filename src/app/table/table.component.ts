
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../chart.service';
import { Router } from '@angular/router';
import { CharttypesComponent } from '../charttypes/charttypes.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // @ViewChild('xAxisInput') xAxisInput!: ElementRef;
  // @ViewChild('yAxisInput') yAxisInput!: ElementRef;
  // @ViewChild('apiUrlInput') apiUrlInput!: ElementRef;
  // @ViewChild('chartContainer') chartContainer!: ElementRef;
  tableData: any = [];
  editingChart:any=null;

  constructor(private service:ChartService,private route:Router) {
    
  }

  ngOnInit(): void {
    this.tableData=this.service.getData();
    this.service.chartData.subscribe((data)=>{
      this.tableData=data;
      

      
    })
  }
  goToAddChart(){
this.editingChart=null;
this.service.setSelectedChartData(this.editingChart);
    this.route.navigate(['/chart']);
    // this.resetForm();
  }
  // show()
  // {
   
  //   console.log("jii",this.tableData)
  // }
  editChartParams(chart:any):void{
   this.service.setSelectedChartData(chart);
   this.route.navigate(['/chart']);
    // this.xAxisInput.nativeElement.value = this.editingChart.xAxisValues.join(',');
    // this.yAxisInput.nativeElement.value = this.editingChart.yAxisValues.join(',');
    // this.apiUrlInput.nativeElement.value = this.editingChart.apiUrl;

    console.log(this.editingChart);

  }
  deleteChartParams(param:any):void{

      this.service.deleteChartData(param);
      // this.tableData.splice(index,1);

    }
  }
 


 

