import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AsyncSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnlockComponent } from 'src/app/app-mime/user/components/unlock/unlock.component';
import { AuthService } from 'src/app/app-mime/user/services/auth.service';
import { Crypto } from 'src/app/global/crypto';
import { ISidenav } from '../../interfaces/isidenav';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'menu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {

  // Variables privadas
  private unsubscribe$: Subject<void> = new Subject<void>();
  private unlock$: AsyncSubject<boolean> = new AsyncSubject<boolean>();

  // ViewChild
  @ViewChild('snav') private snavElement: MatSidenav;

  // Variables públicas
  menu: ISidenav[] = null;
  title: string = 'MIME Insurance';
  mobileQuery: MediaQueryList;
  darkTheme: boolean;

  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private snav: SidenavService,
    private aus: AuthService,
    private mdialog: MatDialog
  ) {

    // Aspectos en Mobile
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  /**
   * Inicializa views
   */
  ngAfterViewInit(): void {
    this.snav.setSnavElement(this.snavElement);
  }

  /**
   * Destruye componente
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
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
    this.aus.isLogged$()
      .subscribe({
        next: (value: boolean) => {
          indLogged = value;
          if (!value) {

            // Emite un valor
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
    console.log('Unlock');

    this.menu = null;
    const dialogUnlock = this.mdialog.open(UnlockComponent, { disableClose: true });

    // Subscribe a la acción
    dialogUnlock.afterClosed()
      .subscribe((result) => {

        // Obtener menú
        this.getMenu();

        // Inicializar AsyncSubject
        this.unlock$ = new AsyncSubject();
        this.initSubject();
      });
  }

  /**
   * Obtiene el menú de la aplicación
   */
  getMenu(): void {

    // Obtiene menú localstorage
    const m: string = Crypto.decryptAES(localStorage.getItem('menu'));
    this.menu = (m === undefined || m === null) ? null : <ISidenav[]>JSON.parse(m);

    if (this.menu === undefined || this.menu === null) {

      // Suscribe para obtener el menú
      this.snav.getMenuSidenav()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((menu: ISidenav[]) => {

          // Guardar menú localstorage
          localStorage.setItem('menu', Crypto.encryptAES(JSON.stringify(m)));

          // Asigna menú
          this.menu = menu;
        });
    }
  }
}