import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IQuestions } from '../interfaces/iquestions';

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
}
