import { Component, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { PostService } from '../../services/post.service';
import { MatCardModule } from '@angular/material/card'; // ✅ Import Material Card

@Component({
  selector: 'app-post-list',
  standalone: true, // ✅ Standalone component
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [CommonModule, NgFor, MatCardModule] // ✅ Add CommonModule & NgFor
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }
}
