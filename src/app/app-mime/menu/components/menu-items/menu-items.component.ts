import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ISidenav } from '../../interfaces/isidenav';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(270deg)' })),
      state('expanded', style({ transform: 'rotate(360deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})

export class MenuItemsComponent implements OnInit {

  //Inputs
  @Input() menuitem: ISidenav;
  @Input() idx: number;

  //Variables clase
  expanded: boolean;

  constructor(private _snav: SidenavService) {

    //Se inicializa si no está definida
    if (this.idx === undefined || this.idx === null) this.idx = 0;
  }

  ngOnInit(): void {
  }

  /**
   * Seleccionar ítem
   * @param item Menú de navegación
   */
  onItemSelected(item: ISidenav) {
    if (item.app && item.app.length) {
      this.expanded = !this.expanded;
    } else this.ontoggleSideNav();
  }

  /**
   * Emite el evento toogle SideNav
   */
  ontoggleSideNav(): void {
    this._snav.toggleSnav();
  }
}
