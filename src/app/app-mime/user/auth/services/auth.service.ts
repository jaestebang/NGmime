import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { Constants } from 'src/app/global/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _cookie: CookieService, private _htpp: HttpClient) { }

  /**
   * Login
   * @param user  Usuario
   * @param pass  Contraseña
   */
  login(user: string, pass: string): Observable<boolean> {    

    //Liberamos todas las cookies - storage
    this._cookie.deleteAll();
    localStorage.clear();

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
    return this.isLogged();
  }

  /**
   * Verifica si el usuario ha iniciado sesión
   */
  isLogged(): Observable<boolean> {
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
