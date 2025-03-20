import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CreatePostComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const newPost = this.postForm.value;
      this.postService.createPost(newPost).subscribe((res: any) => {
        this.router.navigate(['/posts']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/posts']);
  }
}
