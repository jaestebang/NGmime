import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mimebase',
  templateUrl: './mimebase.component.html',
  styleUrls: ['./mimebase.component.scss']
})
export class MimebaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  imprimir(str: string): string {
    return `Elvalor es: ${str}`;
  }

}
