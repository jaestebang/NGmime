import { HttpContext, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/app-mime/user/services/auth.service';

// Contexto de inclusión de autorización
const CHECK_AUTH = new HttpContextToken<boolean>(() => true);

/**
 * Deshabilita contexto de header de autorización
 * @returns Contexto
 */
export function notAuth(): HttpContext {
  return new HttpContext().set(CHECK_AUTH, false);
}

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {  

  constructor(private auth: AuthService) { }

  /**
   * Intercepta petición
   * @param req Request
   * @param next Handler
   * @returns Observable
   */
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    // Valida si tiene contexto creado para añadir autenticación
    if (req.context.get(CHECK_AUTH))
      req = this.addAuthHeader(req);
    return next.handle(req);
  }

  /**
   * Añade authorization
   * @param req Request
   * @returns Request
   */
  private addAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const requAuth: HttpRequest<any> = req.clone(
      {
        headers: req.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
      });

    return requAuth;
  }
}
