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
  @Input() dynamicquestion: IQuestions;
  @Input() form: FormGroup;

  //Publics
  questionForm: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.questionForm = this.form;    
  }

  ngOnInit(): void {
  }

  getOptions(q: IQuestions): boolean {
    let ind = false;
    Object.keys(q).forEach(key => {
      if (key === "options") {
        ind = true;
      }
    });
    return ind;
  }
}
