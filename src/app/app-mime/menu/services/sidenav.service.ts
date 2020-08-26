import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { ISidenav } from '../interfaces/isidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private snavElement: MatSidenav

  constructor(private _http: HttpClient) { }

  /**
   * Obtiene el menú
   */
  getMenuSidenav(): Observable<ISidenav[]> {
    console.log("Inicio servicio menú");

    //Obtener menú API
    return this._http.get<ISidenav[]>("/menu");
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
