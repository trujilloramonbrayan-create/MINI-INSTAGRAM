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
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ]
})
export class FriendsPage implements OnInit {
  friends: any[] = [];
  searchTerm: string = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFriends();
  }

  loadFriends() {
    this.api.getFriends().subscribe({
      next: (friends: any) => {
        this.friends = friends;
      },
      error: (error: any) => {
        console.error('Error al cargar amigos', error);
      }
    });
  }

  searchUsers() {
    if (!this.searchTerm) return;
    
    // Comentar temporalmente hasta que exista el método en ApiService
    /*
    this.api.searchUsers(this.searchTerm).subscribe({
      next: (users: any) => {
        // Manejar resultados de búsqueda
      },
      error: (error: any) => {
        console.error('Error al buscar usuarios', error);
      }
    });
    */
  }

  goBack() {
    this.router.navigate(['/feed']);
  }
}