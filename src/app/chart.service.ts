import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService implements OnInit {
  selectedChartData: any = null;
  private selectedChartDataKey = 'selectedChartData';

  value:any;
  private chartParameters: any[] = [];
  chartData =new EventEmitter<any>();
  constructor(private http: HttpClient) { 
    this.chartParameters = JSON.parse(localStorage.getItem('selected') || '[]');
    this.chartData.emit(this.chartParameters);
  }

  ngOnInit(): void {
    if(this.getData()!=null)
    {
      this.chartParameters=this.getData()
    }
  }
  getChartData(apiUrl: string): Observable<any[]> {
    return this.http.get<any[]>(apiUrl);
  }

  setData(data:any)
  {
    this.selectedChartData=null;
    
    this.chartParameters.push(data);
    localStorage.setItem('selected',JSON.stringify(this.chartParameters));
    this.chartData.emit(this.chartParameters);
  }

  getData():any
  {
    console.log("get",this.chartParameters)
     this.selectedChartData=null;
    localStorage.setItem('selected',JSON.stringify(this.chartParameters));
    return this.chartParameters
  }
  setSelectedChartData(data:any):void{
    this.selectedChartData=data;
    localStorage.setItem(this.selectedChartDataKey, JSON.stringify(data));
    console.log(this.selectedChartData);
    // this.chartParameters.push(data);
    // localStorage.setItem('selected',JSON.stringify(this.chartParameters));
    // this.chartData.emit(this.chartParameters);
  }
  // getSelectedChartData():any{
  
  // console.log("hello",this.selectedChartData)
  //   return this.selectedChartData;
    
    
   
  // }
  getSelectedChartData(): any {
  const data=localStorage.getItem(this.selectedChartDataKey);
   
    this.selectedChartData = data ? JSON.parse(data) : null;
    console.log("slectedchartservice",this.selectedChartData)
    return this.selectedChartData;

  }
  deleteChartData(param: any): void {

    this.value=param;
    this.chartParameters=this.chartParameters.filter((item:any)=>item!==this.value);
    localStorage.setItem('selected', JSON.stringify(this.chartParameters));
    this.chartData.emit(this.chartParameters);
   
  }


}
