import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ISidenav } from '../app-mime/menu/interfaces/isidenav';
import { AuthService } from '../app-mime/user/services/auth.service';
import { Crypto } from '../global/crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {

  private isLogged: Observable<boolean>;
  constructor(private router: Router, private aus: AuthService) {

  }

  /**
   * Búsqueda de aplicación
   * @param cod Código Aplicación
   */
  private filterApp(cod: string): boolean {

    let ind: boolean = false;

    // Obtiene menú localstorage
    const m: string = Crypto.decryptAES(localStorage.getItem('menu'));
    const menu: ISidenav[] = (m === undefined || m === null) ? null : <ISidenav[]>JSON.parse(m);

    // Filtra en las opciones
    if (!(m === undefined || m === null)) {
      try {
        menu.forEach((aom => {
          if (ind) return ind;

          // Busca la aplicación
          if (!(aom.app === undefined || aom.app === null)) {
            aom.app.map(function mapper(s) {
              if (ind) return;
              if (!(s.app === undefined || s.app === null)) {
                return s.app.map(mapper);
              } else {
                if (s.params !== undefined && s.params !== null) {
                  ind = s.params.includes(cod);
                }
              }
            });
          } else if (aom.route) {
            if (!(aom === undefined || aom === null))
              ind = aom.params.includes(cod);
          }

        }));

      } catch (e) {
        console.log('error', e);
      }

      // Si no está la opción no permite ingreso
      if (!ind) {
        this.router.navigate(['forbidden']);
      }
    }
    return ind;
  }

  /**
   * Activate
   * @param next  Ruta activada
   * @param state  Estado de la ruta
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let ind: boolean;

    // Valida si está logueado
    this.aus.isLogged$()
      .subscribe({
        next: (value) => {
          ind = value;
          if (!value) this.router.navigate(['auth']);
        }
      });

    // Valida si permite opción de menú
    const PATH: string[] = next.routeConfig.path.toString().split('/');
    ind = (ind && !PATH.includes('mime')) ? this.filterApp(PATH[0].toString()) : ind;
    return ind;
  }

  /**
   * Deactivate
   * @param component     Componente a inactivar
   * @param currentRoute  Ruta actual
   * @param currentState  Siguiente ruta
   * @param nextState     Siguiente estado
   */
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}