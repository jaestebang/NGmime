import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SharedFormsModule } from './../../../shared/sharedforms.module';
import { BaseComponent } from './components/base/base.component';
import { ManagementComponent } from './components/management/management.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RiskComponent } from './components/risk/risk.component';
import { ProviderQuoteService } from './services/provider-quote.service';
import { QuoteRoutingModule } from './quote-routing.module';
import { AddresComponent } from './components/addres/addres.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CoveragesComponent } from './components/coverages/coverages.component';

/**
 * Inicializa parámetros al cargar el módulo
 * @param provider QuoteService
 * @returns QuoteService.initParameters()
 */
export function initProviderFactory(provider: ProviderQuoteService) {
  return () => provider.initParameters();
}

@NgModule({
  declarations: [
    QuestionsComponent,
    BaseComponent,
    ManagementComponent,
    RiskComponent,
    AddresComponent,
    VehicleComponent,
    CoveragesComponent
  ],
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
   * @param pqs ProviderQuoteService
   */
  constructor(pqs: ProviderQuoteService) {
    pqs.initParameters();
  }
}
