import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AsyncSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnlockComponent } from 'src/app/app-mime/user/components/unlock/unlock.component';
import { AuthService } from 'src/app/app-mime/user/services/auth.service';
import { Crypto } from 'src/app/global/crypto';
import { isNullOrUndefined } from 'util';
import { ISidenav } from '../../interfaces/isidenav';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'menu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {

  //Variables privadas
  private unsubscribe$: Subject<void> = new Subject<void>();
  private unlock$: AsyncSubject<boolean> = new AsyncSubject<boolean>();

  //ViewChild
  @ViewChild("snav") private snavElement: MatSidenav;

  //Variables públicas
  menu: ISidenav[] = null;
  title: string = "MIME Insurance";
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

  /**
   * Inicializa views
   */
  ngAfterViewInit(): void {
    this._snav.setSnavElement(this.snavElement);
  }

  /**
   * Destruye componente
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.unlock$.complete();
  }

  /**
   * Init
   */
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

    this.menu = null;
    const dialogUnlock = this._mdialog.open(UnlockComponent, { disableClose: true });

    //Subscribe a la acción
    dialogUnlock.afterClosed()
      .subscribe((result) => {
        
        //Obtener menú
        this.getMenu();

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