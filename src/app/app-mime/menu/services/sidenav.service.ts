import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
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
    return this.http.get<ISidenav[]>(this.urlApi);
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
