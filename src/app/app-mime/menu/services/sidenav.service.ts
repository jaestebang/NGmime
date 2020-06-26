import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ISidenav } from '../interfaces/isidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private api_url: string = "http://localhost:3000";
  private snavElement: MatSidenav

  constructor(private _http: HttpClient) { }

  /**
   * Obtiene el menú
   */
  getMenuSidenav(): Observable<ISidenav[]> {
    console.log("Inicio servicio menú");

    //Obtener menú API
    return this._http.get<ISidenav[]>(`${this.api_url}/menu`);
  }

  /**
   * Toggle SideNav
   */
  toggleSnav() {
    this.snavElement.toggle();
  }

  /**
   * Set de variable SideNav
   * @param m MatSidenav
   */
  setSnavElement(m: MatSidenav) {
    this.snavElement = m;
  }
}
