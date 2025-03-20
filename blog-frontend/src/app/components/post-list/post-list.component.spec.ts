import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const postSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, RouterTestingModule],
      declarations: [PostListComponent],
      providers: [
        { provide: PostService, useValue: postSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on initialization', () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' }
    ];
    postService.getPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });

  it('should navigate to create post page', () => {
    component.createPost();
    expect(router.navigate).toHaveBeenCalledWith(['/create-post']);
  });
});
