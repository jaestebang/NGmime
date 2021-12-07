import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _cookie: CookieService, private _htpp: HttpClient) { }

  /**
   * Inicializa
   */
  init() {
    this._cookie.deleteAll();
    localStorage.clear();
  }

  /**
   * Login
   * @param user  Usuario
   * @param pass  Contraseña
   * @param reset Reinicia cookies - storage
   */
  login(user: string, pass: string, reset: boolean = true): Observable<boolean> {    

    //Liberamos todas las cookies - storage
    if (reset) {
      this._cookie.deleteAll();
      localStorage.clear();
    }

    //Aquí se debe realizar el llamado al endopoint

    /*
    this._htpp.post("", "")
      .subscribe(
        data => console.log(data),
        err => (console.log(err)),
        () => console.log("Petición finalizada")
      );
      */

    //Registra la cookie con el token de sesión
    this._cookie.set("token", pass, Constants.timeExpireCookie, "/");

    //Retorna si está logueado
    return this.isLogged$();
  }

  /**
   * Verifica si el usuario ha iniciado sesión
   */
  isLogged$(): Observable<boolean> {
    return new Observable<boolean>(obs => {
      obs.next((this.getToken().length > 0) ? true : false);
    })
  }

  /**
   * Obtiene el token almacenado
   */
  getToken(): string {
    return this._cookie.get("token");
  }

}
