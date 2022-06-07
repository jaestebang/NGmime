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
  constructor(public router: Router, public ar: ActivatedRoute, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  /**
   * Navega por la ruta principal
   * @param route Ruta
   */
  navigateByMimeRouting(route: string) {
    MimeRouterNavigate.navigateByMimeRouting(this.router, route);
  }

  /**
   * Navega por la ruta del router actual
   * @param route Ruta
   */
  navigate(route: string) {
    this.router.navigate([route], { relativeTo: this.ar });
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
    this.spinner.show();
  }

  /**
   * Hide NgxSpinner
   */
  spinnerHide() {
    this.spinner.hide();
  }

}
