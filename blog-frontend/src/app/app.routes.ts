import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'posts', component: PostListComponent },
    { path: 'create-post', component: CreatePostComponent }
];
