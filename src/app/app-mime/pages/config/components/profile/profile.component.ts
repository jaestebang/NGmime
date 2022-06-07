import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private snip: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.snip.show(); 
    setTimeout(() => {
      // spinner ends after 5 seconds
      this.snip.hide();
    }, 5000);
  }
}
