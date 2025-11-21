import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // CAMBIO PRINCIPAL: Cambiar la baseUrl para usar el proxy
  private baseUrl = '/api'; // <- CAMBIADO DE 'http://20.20.1.180' A '/api'

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // ========================================
  // Auth - Corregido según documentación
  // ========================================
  
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    // La API espera "name" y "username" según la documentación
    return this.http.post(`${this.baseUrl}/register`, { 
      name: username,  // Se usa username como name
      email, 
      password,
      username 
    });
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, { headers: this.getHeaders() });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers: this.getHeaders() });
  }

  // ========================================
  // Posts - Ya estaban correctos
  // ========================================
  
  getPosts(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts?page=${page}`, { headers: this.getHeaders() });
  }

  createPost(formData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // NO incluir Content-Type para multipart/form-data, el navegador lo agrega automáticamente
    return this.http.post(`${this.baseUrl}/posts`, formData, { headers });
  }

  getPost(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${postId}`, { headers: this.getHeaders() });
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${postId}`, { headers: this.getHeaders() });
  }

  // ========================================
  // Likes - Ya estaban correctos
  // ========================================
  
  likePost(postId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/${postId}/like`, {}, { headers: this.getHeaders() });
  }

  unlikePost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${postId}/like`, { headers: this.getHeaders() });
  }

  // ========================================
  // Comments - Ya estaban correctos
  // ========================================
  
  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${postId}/comments`, { headers: this.getHeaders() });
  }

  createComment(postId: number, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/${postId}/comments`, { content }, { headers: this.getHeaders() });
  }

  deleteComment(postId: number, commentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${postId}/comments/${commentId}`, { headers: this.getHeaders() });
  }

  // ========================================
  // Friends - Corregido según documentación
  // ========================================
  
  getFriends(): Observable<any> {
    return this.http.get(`${this.baseUrl}/friends`, { headers: this.getHeaders() });
  }

  getPendingRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/friendships/pending`, { headers: this.getHeaders() });
  }

  acceptFriendRequest(friendshipId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/friendships/${friendshipId}/accept`, {}, { headers: this.getHeaders() });
  }

  // Agregado según documentación (no estaba en tu código original)
  rejectFriendRequest(friendshipId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/friendships/${friendshipId}/reject`, {}, { headers: this.getHeaders() });
  }

  // CORREGIDO: La ruta correcta es /users/{user}/friend
  sendFriendRequest(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/friend`, {}, { headers: this.getHeaders() });
  }

  removeFriend(friendshipId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/friendships/${friendshipId}`, { headers: this.getHeaders() });
  }

  // ========================================
  // Users - Métodos adicionales (no están en la documentación pero pueden ser útiles)
  // ========================================
  
  searchUsers(term: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/search?q=${term}`, { headers: this.getHeaders() });
  }

  getProfile(userId?: number): Observable<any> {
    const url = userId 
      ? `${this.baseUrl}/users/${userId}` 
      : `${this.baseUrl}/me`;  // Cambiado a /me según la documentación
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserPosts(userId?: number): Observable<any> {
    const url = userId 
      ? `${this.baseUrl}/users/${userId}/posts` 
      : `${this.baseUrl}/posts/user`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, data, { headers: this.getHeaders() });
  }

  updateProfilePicture(formData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/profile/picture`, formData, { headers });
  }

  // ========================================
  // Notifications (opcional - no están en la documentación)
  // ========================================
  
  getNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications`, { headers: this.getHeaders() });
  }

  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/${notificationId}/read`, {}, { headers: this.getHeaders() });
  }
}