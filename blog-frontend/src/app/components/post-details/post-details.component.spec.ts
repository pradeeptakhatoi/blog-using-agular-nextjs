import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailsComponent } from './post-details.component';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let activatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const postSpy = jasmine.createSpyObj('PostService', ['getPostById']);
    activatedRoute = { snapshot: { paramMap: new Map([['id', '1']]) } };

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, RouterTestingModule],
      declarations: [PostDetailsComponent],
      providers: [
        { provide: PostService, useValue: postSpy },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post details when ID is present', () => {
    const mockPost = { id: 1, title: 'Test Post', content: 'This is a test post' };
    postService.getPostById.and.returnValue(of(mockPost));

    component.ngOnInit();
    expect(postService.getPostById).toHaveBeenCalledWith('1');
    expect(component.post).toEqual(mockPost);
  });

  it('should not call getPostById when no ID is present', () => {
    activatedRoute.snapshot.paramMap = new Map(); // No 'id' parameter
    component.ngOnInit();
    expect(postService.getPostById).not.toHaveBeenCalled();
    expect(component.post).toBeUndefined();
  });
});
