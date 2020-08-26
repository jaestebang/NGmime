import { Component, OnInit } from '@angular/core';
import { MimebaseComponent } from 'src/app/shared/components/mimebase/mimebase.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends MimebaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
