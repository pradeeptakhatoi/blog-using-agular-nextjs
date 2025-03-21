import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { authGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostListComponent },
    { path: 'post/:id', component: PostDetailsComponent },
    { path: 'create-post', component: CreatePostComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];
