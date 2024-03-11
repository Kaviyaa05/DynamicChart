import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService implements OnInit {
  selectedChartData: any = null;
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
    // this.selectedChartData=null;
    this.chartParameters.push(data);
    localStorage.setItem('selected',JSON.stringify(this.chartParameters));
    this.chartData.emit(this.chartParameters);
  }

  getData():any
  {
    this.selectedChartData=null;
    return this.chartParameters
  }
  setSelectedChartData(data:any):void{
    this.selectedChartData=data;
    console.log(this.selectedChartData);
  }
  getSelectedChartData():any{
    return this.selectedChartData;
   
  }
  deleteChartData(param:any):void{
    this.chartParameters.splice(param,1);
    localStorage.setItem('selected',JSON.stringify(this.chartParameters));
    this.chartData.emit(this.chartParameters);
  }


}
