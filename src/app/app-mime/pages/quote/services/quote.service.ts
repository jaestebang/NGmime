import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IQuestions } from '../interfaces/iquestions';
import { IRisk } from '../interfaces/irisk';
import { IQuote } from '../interfaces/iquote';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private urlApi: string = Constants.API_MIME;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene preguntas
   * @returns Observable de tipo IQuestions[]
   */
  getQuestions(): Observable<IQuestions[]> {
    console.log('Inicio', this.getQuestions.name);
    return this.http.get<IQuestions[]>(`${this.urlApi}/questions`);
  }

  /**
   * Obtiene preguntas
   * @returns Observable de tipo IQuestions[]
   */
  getRisk(): Observable<IRisk> {
    console.log('Inicio', this.getRisk.name);
    return this.http.get<IRisk>(`${this.urlApi}/risk`);
  }

  /**
   * Obtiene cotización
   * @returns Observable de tipo IQuote[]
   */
  getQuote(): Observable<IQuote> {
    console.log('Inicio', this.getQuote.name);
    return this.http.get<IQuote>(`${this.urlApi}/quote`);
  }

}
