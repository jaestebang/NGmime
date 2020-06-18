import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISidenav } from '../interfaces/isidenav';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private api_url: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  /**
   * Obtiene el menú
   */
  getMenuSidenav(): Observable<ISidenav[]> {
    console.log("Inicio servicio menú");
    
    //Obtener menú API
    return this._http.get<ISidenav[]>(`${this.api_url}/menu`);
  }
}
