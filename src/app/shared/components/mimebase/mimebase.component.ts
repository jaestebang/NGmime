import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MimeRouterNavigate } from 'src/app/core/navigate/mime-router-navigate';

@Component({
  selector: 'app-mimebase',
  templateUrl: './mimebase.component.html',
  styleUrls: ['./mimebase.component.scss']
})
export class MimebaseComponent implements OnInit {
  constructor(public _router: Router, public _ar: ActivatedRoute, public _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  /**
   * Navega por la ruta principal
   * @param route Ruta
   */
  navigateByMimeRouting(route: string) {
    MimeRouterNavigate.navigateByMimeRouting(this._router, route)
  }

  /**
  * Navega por la ruta del router actual
  * @param route Ruta
  */
  navigate(route: string) {
    this._router.navigate([route], { relativeTo: this._ar });
  }

  /**
   * Retorna el tema aplicado al componente principal
   * @returns Theme: light - dark
   */
  getMimeTheme(): string {
    return document.getElementById('mime-container').classList.contains('mime-dark-theme') ? 'theme-dark' : 'theme-light'
  }

  /**
   * Show NgxSpinner
   */
  spinnerShow() {
    console.log('INI');
    this._spinner.show();
  }

  /**
   * Hide NgxSpinner
   */
  spinnerHide() {
    this._spinner.hide();
  }

}
