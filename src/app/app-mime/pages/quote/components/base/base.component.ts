import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MimebaseComponent } from 'src/app/shared/components/mimebase/mimebase.component';
import { IQuestions } from '../../interfaces/iquestions';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent extends MimebaseComponent implements OnInit {
  isLinear = true;
  questions: IQuestions[] = null;
  questionForm: FormGroup;

  /**
   * Constructor
   * @param _squote 
   * @param _fb 
   * @param _router 
   * @param _ar 
   */
  constructor(private _squote: QuoteService,
    private _fb: FormBuilder,
    public _router: Router,
    public _ar: ActivatedRoute,
    public _spinner: NgxSpinnerService) {

    //Inicializa base
    super(_router, _ar, _spinner);

    //Inicializa FormGroup
    this.questionForm = this._fb.group({ init: [''] });
  }

  ngOnInit(): void {
    this.spinnerShow();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerHide();
      this._squote.getQuestions()
      .subscribe((q: IQuestions[]) => {
        this.questions = q;
        this.buildForm();
      });
    }, 5000);

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

  onManagement() {

    //Navegar a una ruta principal    
    this.navigateByMimeRouting("profile");

    //Se navega a la ruta, relativo a la posición actual
    //this.navigate("management");
  }
}
