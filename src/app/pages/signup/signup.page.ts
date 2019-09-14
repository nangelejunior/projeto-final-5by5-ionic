import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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
      name: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(80),
        Validators.required
      ])],
      email: ['', Validators.compose([
        CustomValidator.EmailValidator,
        Validators.required
      ])],
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
    const loading = await this.loadingCtrl.create({ message: "Cadastrando usuário..." });
    loading.present();

    this.service.createUser(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha no cadastro do usuário!")
        }
      );
  }

  async showSuccess(data) {
    UserUtil.save(data);

    const alert = await this.alertCtrl.create({
      message: `Seja bem-vindo, ${data.name}!`,
      buttons: [
        {
          text: "Continuar",
          handler: () => {
            this.navigateToHome();
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
