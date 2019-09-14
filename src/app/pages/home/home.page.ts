import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contacts: Contact[];

  constructor(
    private service: DataService
  ) { }

  ngOnInit() {
    this.service.getContacts()
      .subscribe(
        (res: Contact[]) => {
          this.contacts = res;
        }
      );
  }

}
