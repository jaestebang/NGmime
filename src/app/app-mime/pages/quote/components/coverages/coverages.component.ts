import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ICoverages } from '../../interfaces/icoverages';

@Component({
  selector: 'quote-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss']
})
export class CoveragesComponent implements OnInit, OnChanges {

  //Variables Públicas
  dataSource = new MatTableDataSource<ICoverages>();
  displayedColumns: string[] = ['key', 'description', 'capital'];

  //Inputs Decorator
  @Input() form: FormGroup;
  @Input() dynamiccoverages: ICoverages[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<ICoverages>(this.dynamiccoverages);
    console.log("Coberturas", this.dynamiccoverages);
  }

  ngOnInit(): void {
  }

  getDataSource(): MatTableDataSource<ICoverages>{ 
    return this.dataSource;
  }

}