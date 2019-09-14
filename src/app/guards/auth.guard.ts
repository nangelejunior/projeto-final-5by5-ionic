import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserUtil } from '../utils/user.util';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController
  ) { }

  canActivate() {
    const user = UserUtil.get();
    if (user)
      return true;

    this.navCtrl.navigateRoot('/login');

    return false;
  }

}