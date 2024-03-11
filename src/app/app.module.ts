
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxApexchartsModule } from 'ngx-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CharttypesComponent } from './charttypes/charttypes.component';
import { TableComponent } from './table/table.component';
import { MonacoComponent } from './monaco/monaco.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { DynamicComponent } from './dynamic/dynamic.component';

// const monacoConfig: NgxMonacoEditorConfig = {
//   baseUrl: 'app-name/assets', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets'
//   defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
//   onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
//   requireConfig: { preferScriptTags: true } // allows to oweride configuration passed to monacos loader
//   monacoRequire: (<any>window).monacoRequire // pass here monacos require function if you loaded monacos loader (loader.js) yourself 
// };

@NgModule({
  declarations: [
    AppComponent,
  
        CharttypesComponent,
        TableComponent,
        MonacoComponent,
        DynamicComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxApexchartsModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot()
  

  
  
   
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
