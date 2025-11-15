import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonRefresher, 
  IonRefresherContent, 
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonAvatar,
  IonLabel,
  IonTabBar,
  IonTabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  addCircleOutline, 
  imagesOutline, 
  heart, 
  heartOutline, 
  chatbubbleOutline, 
  paperPlaneOutline,
  home,
  search,
  people,
  person
} from 'ionicons/icons';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonAvatar,
    IonLabel,
    IonTabBar,
    IonTabButton
  ]
})
export class FeedPage implements OnInit {
  posts: any[] = [];
  loading: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    // Registrar todos los iconos que se usan en el template
    addIcons({
      'add-circle-outline': addCircleOutline,
      'images-outline': imagesOutline,
      'heart': heart,
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'paper-plane-outline': paperPlaneOutline,
      'home': home,
      'search': search,
      'people': people,
      'person': person
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.api.getPosts().subscribe({
      next: (posts: any) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar posts', error);
        this.loading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.api.getPosts().subscribe({
      next: (posts: any) => {
        this.posts = posts;
        event.target.complete();
      },
      error: (error: any) => {
        console.error('Error al refrescar', error);
        event.target.complete();
      }
    });
  }

  toggleLike(post: any) {
    // Implementar lógica de like
    post.liked = !post.liked;
    if (post.liked) {
      post.likes_count++;
    } else {
      post.likes_count--;
    }
  }

  createPost() {
    this.router.navigate(['/create-post']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToFriends() {
    this.router.navigate(['/friends']);
  }
}