export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    profile?: any;
  }
  
  export interface Post {
    id: number;
    user_id: number;
    caption?: string;
    image_url: string;
    likes_count: number;
    comments_count: number;
    is_liked: boolean;
    user?: User;
    created_at: string;
  }
  
  export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    content: string;
    user?: User;
    created_at: string;
  }