import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTextarea,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, image, checkmark } from 'ionicons/icons';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonTextarea
  ]
})
export class CreatePostPage {
  caption: string = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    // Registrar iconos
    addIcons({
      'arrow-back': arrowBack,
      'image': image,
      'checkmark': checkmark
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async createPost() {
    if (!this.selectedImage) {
      this.showToast('Por favor selecciona una imagen');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Publicando...'
    });
    await loading.present();

    const formData = new FormData();
    formData.append('image', this.selectedImage);
    if (this.caption) {
      formData.append('caption', this.caption);
    }

    this.api.createPost(formData).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast('Publicación creada exitosamente');
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        loading.dismiss();
        this.showToast('Error al crear publicación');
        console.error('Error al crear post:', error);
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

  goBack() {
    this.router.navigate(['/feed']);
  }
}