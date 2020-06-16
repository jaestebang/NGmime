import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsyncSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/app-mime/user/auth/services/auth.service';
import { UnlockComponent } from 'src/app/app-mime/user/unlock/unlock.component';
import { Crypto } from 'src/app/global/crypto';
import { isNullOrUndefined } from 'util';
import { ISidenav } from '../interfaces/isidenav';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'menu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  //Variables privadas
  private unsubscribe$: Subject<void> = new Subject<void>();
  private unlock$: AsyncSubject<boolean> = new AsyncSubject<boolean>();

  //Variables públicas
  menu: ISidenav[] = null;
  title: string = "MIME";
  mobileQuery: MediaQueryList;
  darkTheme: boolean;

  private _mobileQueryListener: () => void;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    private _snav: SidenavService,
    private _aus: AuthService,
    private _mdialog: MatDialog
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
    this.unlock$.complete();
  }

  ngOnInit(): void {
    this.initSubject();
    this.getMenu();
  }

  /**
   * Revisa si está logueado
   */
  isLogged(): boolean {
    let indLogged: boolean;
    this._aus.isLogged$()
      .subscribe({
        next: (value: boolean) => {
          indLogged = value;
          if (!value) {

            //Emite un valor
            this.unlock$.next(true);
            this.unlock$.complete();
          }
          return indLogged;
        }
      }
      );

    return indLogged;
  }

  /**
   * Subscribe subject
   */
  initSubject(): void {
    this.unlock$.subscribe(value => {
      if (value) {
        this.unlock();
      }
    });
  }

  /**
   * Abre modal Unlock
   */
  unlock() {
    console.log("Unlock");

    const dialogUnlock = this._mdialog.open(UnlockComponent, { disableClose: true });

    //Subscribe a la acción
    dialogUnlock.afterClosed()
      .subscribe((result) => {

        //Inicializar AsyncSubject
        this.unlock$ = new AsyncSubject();
        this.initSubject();
      });
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