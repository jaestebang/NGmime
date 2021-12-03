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
   * Get Questions
   */
  getQuestions(): Observable<IQuestions[]> {
     console.log("Inicio getQuestions");
     
    return this._http.get<IQuestions[]>("/questions");
  }
}
