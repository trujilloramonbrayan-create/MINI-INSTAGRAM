import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Por favor completa todos los campos');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Las contraseñas no coinciden');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Registrando...'
    });
    await loading.present();

    // Cambiado: ahora pasa 3 parámetros separados en vez de un objeto
    this.api.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        loading.dismiss();
        this.showToast('Error al registrar usuario');
      }
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}