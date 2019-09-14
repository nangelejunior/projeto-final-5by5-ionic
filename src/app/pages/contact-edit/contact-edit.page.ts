import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { Contact } from 'src/app/models/contact.model';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.page.html',
  styleUrls: ['./contact-edit.page.scss'],
})
export class ContactEditPage implements OnInit {
  public form: FormGroup;
  public contact: Contact;
  public headerTitle: string = 'Novo contato';

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(80),
        Validators.required
      ])],
      email: ['', Validators.compose([
        CustomValidator.EmailValidator,
        Validators.required
      ])],
      cpf: ['', Validators.compose([
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.pattern(/^\d{2}\s\d{5}-\d{4}$/),
        Validators.required
      ])],
      address: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(120),
        Validators.required
      ])]
    })
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.headerTitle = 'Editar contato';

      const loading = await this.loadingCtrl.create({ message: "Carregando contato..." });
      loading.present();

      this.service.getContact(id)
        .subscribe(
          (res: Contact) => {
            this.contact = res;
            this.form.patchValue(res);
            loading.dismiss();
          },
          (err: any) => {
            loading.dismiss();
            this.showError('Não foi possível carregar os dados do contato!');
            this.navCtrl.navigateRoot('/contact-edit');
          }
        );
    }
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Salvando contato..." });
    loading.present();

    if (this.contact) {
      this.contact.name = this.form.controls.name.value;
      this.contact.email = this.form.controls.email.value;
      this.contact.cpf = this.form.controls.cpf.value;
      this.contact.phone = this.form.controls.phone.value;
      this.contact.address = this.form.controls.address.value;

      this.service.updateContact(this.contact)
        .subscribe(
          (res: any) => {
            loading.dismiss();
            this.showSuccess('Contato atualizado com sucesso!');
          },
          (err: any) => {
            loading.dismiss();
            this.showError('Erro ao atualizar contato!');
          }
        );
    } else {
      this.service.createContact(this.form.value)
        .subscribe(
          (res: any) => {
            loading.dismiss();
            this.showSuccess('Contato cadastrado com sucesso!');
          },
          (err: any) => {
            loading.dismiss();
            this.showError('Erro ao cadastrar contato!');
          }
        );
    }
  }

  async delete() {
    const loading = await this.loadingCtrl.create({ message: "Excluindo contato..." });
    loading.present();

    this.service.deleteContact(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess('Contato excluído com sucesso!');
        },
        (err: any) => {
          loading.dismiss();
          this.showError('Erro ao excluir contato!');
        }
      );
  }

  async showSuccess(message) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: "Continuar",
          handler: () => {
            this.navCtrl.navigateRoot('/');
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
