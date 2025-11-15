import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonText,
  IonIcon,
  LoadingController, 
  ToastController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonIcon
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    // Registrar el icono de la cámara
    addIcons({ camera });
  }

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Por favor completa todos los campos');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    this.api.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.token);
        loading.dismiss();
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        loading.dismiss();
        this.showToast('Error al iniciar sesión');
        console.error('Error de login:', error);
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

  goToRegister() {
    this.router.navigate(['/register']);
  }
}