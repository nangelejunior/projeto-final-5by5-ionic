import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactEditPage } from './contact-edit.page';
import { MaskDirective } from 'src/app/directives/mask.directive';

const routes: Routes = [
  {
    path: '',
    component: ContactEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactEditPage, MaskDirective]
})
export class ContactEditPageModule { }
