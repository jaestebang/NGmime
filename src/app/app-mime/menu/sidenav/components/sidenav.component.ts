import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ISidenav } from '../interfaces/isidenav';
import { SidenavService } from '../services/sidenav.service';
import { Crypto } from 'src/app/global/crypto';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'src/app/app-mime/user/auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'menu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  
  menu: ISidenav[] = null;

  title: string = "MIME";
  mobileQuery: MediaQueryList;
  darkTheme: boolean;


  fillerNav = [
    { nombre: "Iniciar sesión", route: "auth" },
    { nombre: "Perfil", route: "profile" }
  ]

  private _mobileQueryListener: () => void;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    private _snav: SidenavService,
    private _aus: AuthService
  ) {

    //Aspectos en Mobile
    this.mobileQuery = _media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getMenu();
  }

  /**
   * Revisa si está logueado
   */
  isLogged(): boolean {
    let indLogged: boolean;
    this._aus.isLogged()
      .subscribe({
        next: (value: boolean) => {
          indLogged = value;
        }
      }
      );

    return indLogged;
  }

  /**
   * Obtiene el menú de la aplicación
   */
  getMenu(): void {
    console.log("getMENU");

    //Obtiene menú localstorage
    const m: string = Crypto.decryptAES(localStorage.getItem("menu"));
    this.menu = (isNullOrUndefined(m)) ? null : <ISidenav[]>JSON.parse(m);

    if (isNullOrUndefined(this.menu)) {

      //Suscribe para obtener el menú
      this._snav.getMenuSidenav()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((m: ISidenav[]) => {

          //Guardar menú localstorage
          localStorage.setItem("menu", Crypto.encryptAES(JSON.stringify(m)));

          //Asigna menú
          this.menu = m;
        });
    }
  }

}