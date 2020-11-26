import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
  
export class CustomTranslateService  implements TranslateLoader{

  constructor(private _http: HttpClient) { }

  /**
   * Obtener traducciones
   * @param lang Lenguaje
   */
  getTranslation(lang: string): Observable<any> {
    return this._http.get("/translate" + `?language=${lang}`);
    throw new Error("Method not implemented.");
  } 
}
