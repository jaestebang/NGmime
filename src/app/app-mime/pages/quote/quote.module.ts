import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SharedFormsModule } from './../../../shared/sharedforms.module';
import { BaseComponent } from './components/base/base.component';
import { ManagementComponent } from './components/management/management.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RiskComponent } from './components/risk/risk.component';
import { ProviderQuoteService } from './services/provider-quote.service';
import { QuoteRoutingModule } from './quote-routing.module';

/**
 * Inicializa parámetros al cargar el módulo
 * @param provider QuoteService
 * @returns QuoteService.initParameters()
 */
export function initProviderFactory(provider: ProviderQuoteService) {
  console.log("Iincio Module");
  return () => provider.initParameters();
}

@NgModule({
  declarations: [QuestionsComponent, BaseComponent, ManagementComponent, RiskComponent],
  imports: [
    CommonModule,
    SharedFormsModule,
    QuoteRoutingModule
  ],
  exports: [],
  providers: [
    ProviderQuoteService, {
      provide: APP_INITIALIZER,
      useFactory: initProviderFactory,
      deps: [ProviderQuoteService],
      multi: true
    }]
})
export class QuoteModule {

  /**
   * Constructor de la clase, en carga perezosa no carga desde APP_INITIALIZER
   * @param _pqs ProviderQuoteService
   */
  constructor(_pqs: ProviderQuoteService) {
    _pqs.initParameters();
  }
}
