import { Component } from '@angular/core';

@Component({
  selector: 'app-monaco',
  templateUrl: './monaco.component.html',
  styleUrls: ['./monaco.component.css']
})
export class MonacoComponent {
  
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
