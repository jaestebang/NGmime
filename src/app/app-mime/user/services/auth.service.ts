import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private cookie: CookieService,
    private htpp: HttpClient,
    private translateService: TranslateService
  ) { }

  /**
   * Inicializa
   */
  init() {
    this.cookie.deleteAll();
    localStorage.clear();
  }

  /**
   * Login
   * @param user  Usuario
   * @param pass  Contraseña
   * @param reset Reinicia cookies - storage
   */
  login(user: string, pass: string, reset: boolean = true): Observable<boolean> {

    // Liberamos todas las cookies - storage
    if (reset) {
      this.cookie.deleteAll();
      localStorage.clear();
    }

    // Aquí se debe realizar el llamado al endopoint

    /*
    this._htpp.post('', '')
      .subscribe(
        data => console.log(data),
        err => (console.log(err)),
        () => console.log('Petición finalizada')
      );
      */

    // Registra la cookie con el token de sesión
    this.cookie.set('token', pass, Constants.timeExpireCookie, '/');

    // Registra el idioma de acuerdo a la configuración de usuario
    this.translateService.use('es');

    // Retorna si está logueado
    return this.isLogged$();
  }

  /**
   * Verifica si el usuario ha iniciado sesión
   */
  isLogged$(): Observable<boolean> {
    return new Observable<boolean>(obs => {
      obs.next((this.getToken().length > 0) ? true : false);
    });
  }

  /**
   * Obtiene el token almacenado
   */
  getToken(): string {
    return this.cookie.get('token');
  }

}
