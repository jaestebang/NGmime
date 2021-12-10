import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IQuestions } from '../interfaces/iquestions';
import { IRisk } from '../interfaces/irisk';
import { IQuote } from '../interfaces/iquote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private _http: HttpClient) { }

  /**
   * Obtiene preguntas
   * @returns Observable de tipo IQuestions[]
   */
  getQuestions(): Observable<IQuestions[]> {
    console.log("Inicio", this.getQuestions.name);
    return this._http.get<IQuestions[]>("/questions");
  }

  /**
 * Obtiene preguntas
 * @returns Observable de tipo IQuestions[]
 */
  getRisk(): Observable<IRisk> {
    console.log("Inicio", this.getRisk.name);
    return this._http.get<IRisk>("/risk");
  }

  /**
   * Obtiene cotización
   * @returns Observable de tipo IQuote[]
   */
  getQuote(): Observable<IQuote> {
    console.log("Inicio", this.getQuote.name);
    return this._http.get<IQuote>("/quote");
  }


}