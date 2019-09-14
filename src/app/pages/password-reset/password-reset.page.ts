import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        CustomValidator.EmailValidator,
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user)
      this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Solicitando nova senha..." });
    loading.present();

    this.service.resetPassword(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess();
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha ao solicitar nova senha!")
        }
      );
  }

  async showSuccess() {
    const alert = await this.alertCtrl.create({
      message: 'Sua nova senha foi enviada por e-mail!',
      buttons: [
        {
          text: "Continuar",
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    alert.present();
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
