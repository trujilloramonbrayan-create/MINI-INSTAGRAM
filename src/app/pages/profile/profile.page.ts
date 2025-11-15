import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent 
} from '@ionic/angular/standalone';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ]
})
export class ProfilePage implements OnInit {
  user: any = {};
  posts: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // Comentar temporalmente hasta que exista el método en ApiService
    /*
    this.api.getProfile().subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error al cargar perfil', error);
      }
    });
    */

    // Usar getPosts en lugar de getUserPosts
    this.api.getPosts().subscribe({
      next: (posts: any) => {
        this.posts = posts;
      },
      error: (error: any) => {
        console.error('Error al cargar posts', error);
      }
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/feed']);
  }
}