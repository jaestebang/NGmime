import { Component, Input, OnInit } from '@angular/core';
import { Iquestions } from '../../interfaces/iquestions';
@Component({
  selector: 'quote-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  //Inputs Decorator
  @Input() dynamicquestions: Iquestions[];

  constructor() { }

  ngOnInit(): void {
  }

}
