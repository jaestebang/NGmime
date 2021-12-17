import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

/**
 * Traducciones
 */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomTranslateService } from './translate/customtranslate.service';

/**
 * Obtiene las traducciones cargadas localmente: assets/i18n
 * @param http HttpClient
 * @returns TranslateHttpLoader
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory), /* useClass: CustomTranslateService */
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})

export class CoreModule { }
