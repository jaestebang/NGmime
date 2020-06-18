import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { isNullOrUndefined } from 'util';
import { ISidenav } from '../../interfaces/isidenav';
import { RouterLink, Router } from '@angular/router';

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

  constructor() {

    //Se inicializa si no está definida
    if (isNullOrUndefined(this.idx)) this.idx = 0;
  }

  ngOnInit(): void {    
  }

  /**
   * Seleccionar ítem
   * @param item 
   */
  onItemSelected(item: ISidenav) {
    if (item.app && item.app.length) {
      this.expanded = !this.expanded;
    }
  }

  routerLink(item: ISidenav): string{
    let r: RouterLink;
    r.routerLink
    return ((!item.route) ? null : "[{ outlets: { snavoutlet: [menuitem.codigo] } }]");
  }
}
