import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { notAuth } from 'src/app/core/http/auth-interceptor.service';
import { Constants } from 'src/app/global/constants';
import { ISidenav } from '../interfaces/isidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private snavElement: MatSidenav;
  private urlApi: string = `${Constants.API_MIME}/menu`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el menú
   */
  getMenuSidenav(): Observable<ISidenav[]> {

    // Obtener menú API
    // Envía contexto deshabilitando authorization { context: notAuth() }
    return this.http.get<ISidenav[]>(this.urlApi, { context: notAuth() });
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
