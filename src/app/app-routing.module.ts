import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'password-reset', loadChildren: () => import('./pages/password-reset/password-reset.module').then(m => m.PasswordResetPageModule) },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuPage,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'contact-edit', loadChildren: () => import('./pages/contact-edit/contact-edit.module').then(m => m.ContactEditPageModule) },
      { path: 'contact-edit/:id', loadChildren: () => import('./pages/contact-edit/contact-edit.module').then(m => m.ContactEditPageModule) },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
