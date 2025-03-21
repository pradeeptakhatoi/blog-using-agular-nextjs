import { Component, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { PostService } from '../../services/post.service';
import { MatCardModule } from '@angular/material/card'; // ✅ Import Material Card
import { Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true, // ✅ Standalone component
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [
    CommonModule,
    NgFor,
    MatCardModule,
    RouterModule
  ]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  createPost() {
    // Navigate to create post page
    this.router.navigate(['/create-post']);
  }

}
