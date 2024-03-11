import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharttypesComponent } from './charttypes/charttypes.component';
import { TableComponent } from './table/table.component';
import { DynamicComponent } from './dynamic/dynamic.component';

const routes: Routes = [
  { path: 'chart', component: CharttypesComponent },
  { path: 'table', component: TableComponent },
  {path:'dynamic',component:DynamicComponent},
  { path: '', redirectTo: '/table', pathMatch: 'full' } // Redirect to chart by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
