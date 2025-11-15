import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'feed',
    loadComponent: () => import('./pages/feed/feed.page').then( m => m.FeedPage)
  },
  {
    path: 'create-post',
    loadComponent: () => import('./pages/create-post/create-post.page').then( m => m.CreatePostPage)
  },
  {
    path: 'friends',
    loadComponent: () => import('./pages/friends/friends.page').then( m => m.FriendsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'create-post',
    loadComponent: () => import('./pages/create-post/create-post.page').then( m => m.CreatePostPage)
  },
  {
    path: 'friends',
    loadComponent: () => import('./pages/friends/friends.page').then( m => m.FriendsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
];
