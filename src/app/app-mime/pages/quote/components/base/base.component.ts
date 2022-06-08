import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable } from 'rxjs';
import { MimebaseComponent } from 'src/app/shared/components/mimebase/mimebase.component';
import { IQuestions } from '../../interfaces/iquestions';
import { IQuote } from '../../interfaces/iquote';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent extends MimebaseComponent implements OnInit {
  isLinear = true;
  quote: IQuote;
  managementForm: FormGroup;
  riskForm: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  orientationValid: boolean;

  constructor(
    private squote: QuoteService,
    private fb: FormBuilder,
    public router: Router,
    public ar: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private breakpointObserver: BreakpointObserver
  ) {

    // Inicializa base
    super(router, ar, spinner);

    // Orientación stepperOrientation
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    // Inicializa FormGroup
    this.managementForm = this.fb.group({ init: [''] });
    this.riskForm = this.fb.group({ init: [''] });

    // Orientación de la pantalla
    this.breakpointObserver.observe([
      '(orientation: landscape)',
    ]).subscribe((result) => {
      this.orientationValid = result.matches;
      if (result.matches)
        this.spinnerHide();
      if (!result.matches)
        this.spinnerShow();
    });
  }

  /**
   * Init
   */
  ngOnInit(): void {
    this.getData();
    console.log('id', this.ar.snapshot.paramMap.get('id'));
  }

  /**
   * Obtiene datos
   */
  getData(): void {
    this.spinnerShow();
    setTimeout(() => {
      this.spinnerHide();

      // Obtiene base de cotización
      this.squote.getQuote()
        .subscribe((quote: IQuote) => {
          this.quote = quote;
          console.log('Quote', this.quote);

          // Compilamos Forms
          this.buildForm(quote.questions, this.managementForm);
          this.buildForm(quote.risk.questions, this.riskForm);

        });

    }, 0);
  }

  /**
   * Compilamos los controles recibidos en this.questions y adicionamos a questionForm
   * @param quest Questions
   * @param formQuestion FormGroup
   */
  private buildForm(quest: IQuestions[], formQuestion: FormGroup) {
    try {
      if (quest) {
        quest.forEach(q => {

          // Obtenemos un nuevo control desde el FormBuilder
          let c: AbstractControl = this.fb.control('');

          // Asignamos validators
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

          // Seteamos valores
          if (q.type === 'date' && !q.options) {
            c.setValue(new Date(q.value).toISOString().substring(0, 10));
          } else {
            c.setValue(q.value);
          }

          // Recalcular valores y status de validación del control
          c.updateValueAndValidity();

          // Adicionamos el control al FormGroup
          formQuestion.addControl(q.key, c);
        });
      }
    } catch (e) {
      console.log('Error Build', e);
    }
  }

  onManagement() {

    // Navegar a una ruta principal    
    this.navigateByMimeRouting('profile');

    // Se navega a la ruta, relativo a la posición actual
    // this.navigate('management');
  }
}