import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ]
})
export class PostDetailsComponent implements OnInit {
  post!: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(postId).subscribe((data: Post) => {
        this.post = data;
      });
    }
  }
}
