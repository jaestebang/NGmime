import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { isNullOrUndefined } from 'util';
import { ISidenav } from '../../interfaces/isidenav';

@Component({
  selector: 'menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
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

  onItemSelected(item: ISidenav) {
    if (item.app && item.app.length) {
      this.expanded = !this.expanded;
    }
  }
}
