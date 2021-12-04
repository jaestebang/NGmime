import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IQuestions } from '../../interfaces/iquestions';
@Component({
  selector: 'quote-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnChanges {

  //Inputs Decorator
  @Input() dynamicquestions: IQuestions[];
  @Input() form: FormGroup;

  //Publics
  questionForm: FormGroup;
  questions: IQuestions[];

  constructor(private _fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.questionForm = this.form;
    this.questions = (this.dynamicquestions) ? this.dynamicquestions : this.questions;
  }

  ngOnInit(): void {
  }

  getValue(q: IQuestions): string {
    console.log("value", q);    
    return q.value;
  }
}
