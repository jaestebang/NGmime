import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

/**
 * Traducciones
 */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomTranslateService } from './translate/customtranslate.service';

/**
 * Obtiene las traducciones cargadas localmente: assets/i18n
 * @param handler HttpBackend
 * @returns TranslateHttpLoader
 */
export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory), /* useClass: CustomTranslateService */
        deps: [HttpBackend]
      }
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})

export class CoreModule { }
