import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MimebaseComponent } from 'src/app/shared/components/mimebase/mimebase.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends MimebaseComponent implements OnInit {

  constructor(private _snip: NgxSpinnerService) {
    super();
  }

  ngOnInit(): void {
    this._snip.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._snip.hide();
    }, 5000);
  }
}
