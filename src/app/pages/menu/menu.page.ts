import { Component, OnInit } from '@angular/core';
import { UserUtil } from 'src/app/utils/user.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public user: any;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.user = UserUtil.get();
  }

  logout() {
    this.navCtrl.navigateRoot('/login');

    UserUtil.delete();
  }

}
