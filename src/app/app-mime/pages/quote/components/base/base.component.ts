import { Component, OnInit } from '@angular/core';
import { IQuestions } from '../../interfaces/iquestions';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  questions: IQuestions[] = null;

  constructor(private _squote: QuoteService) { }

  ngOnInit(): void {
    this._squote.getQuestions()
      .subscribe((q: IQuestions[]) => {
        this.questions = q;
      });
  }

}
