import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestions } from '../../interfaces/iquestions';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  isLinear = true;
  questions: IQuestions[] = null;
  questionForm: FormGroup;

  constructor(private _squote: QuoteService, private _fb: FormBuilder) {
    this.questionForm = this._fb.group({ init: [''] });
  }

  ngOnInit(): void {
    this._squote.getQuestions()
      .subscribe((q: IQuestions[]) => {
        this.questions = q;
        this.buildForm();
      });
  }

  /**
   Compilamos los controles recibidos en this.questions y adicionamos a questionForm
   */
  private buildForm() {
    try {
      if (this.questions) {
        this.questions.forEach(q => {

          //Obtenemos un nuevo control desde el FormBuilder
          let c: AbstractControl = this._fb.control('');

          //Asignamos validators
          if (q.required)
            c.setValidators([Validators.required]);
          if (q.minLength)
            c.setValidators([Validators.minLength(q.minLength)]);
          if (q.maxLength)
            c.setValidators([Validators.minLength(q.maxLength)]);
          if (q.min)
            c.setValidators([Validators.min(q.min)]);
          if (q.max)
            c.setValidators([Validators.min(q.min)]);

          //Seteamos valores
          if (q.type == "date" && !q.options) {
            c.setValue(new Date(q.value).toISOString().substring(0, 10));
          } else {
            c.setValue(q.value);
          }

          //Recalcular valores y status de validación del control
          c.updateValueAndValidity();

          //Adicionamos el control al FormGroup
          this.questionForm.addControl(q.key, c);
        });
      }
    } catch (e) {
      console.log("Error Build", e);
    }
  }

}