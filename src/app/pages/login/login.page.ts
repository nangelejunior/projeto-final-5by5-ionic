import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user)
      this.navigateToHome();
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando usuário..." });
    loading.present();

    this.service.authUser(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha na autenticação do usuário!")
        }
      );
  }

  async showSuccess(data) {
    UserUtil.save(data);

    this.navigateToHome();
  }

  async showError(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Fechar"
    });

    toast.present();
  }

}
