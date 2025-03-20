import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostComponent } from './create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  // ✅ Import this
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('CreatePostComponent (Standalone)', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostService', ['createPost']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CreatePostComponent, // ✅ Standalone component
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule, // ✅ Added this
        MatIconModule,
        CommonModule
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate title field - required & min length', () => {
    let titleControl = component.postForm.controls['title'];
    titleControl.setValue('');
    expect(titleControl.valid).toBeFalsy();
    expect(titleControl.errors?.['required']).toBeTruthy();

    titleControl.setValue('AB');
    expect(titleControl.valid).toBeFalsy();
    expect(titleControl.errors?.['minlength']).toBeTruthy();

    titleControl.setValue('Valid Title');
    expect(titleControl.valid).toBeTruthy();
  });

  it('should validate content field - required & min length', () => {
    let contentControl = component.postForm.controls['content'];
    contentControl.setValue('');
    expect(contentControl.valid).toBeFalsy();
    expect(contentControl.errors?.['required']).toBeTruthy();

    contentControl.setValue('Short');
    expect(contentControl.valid).toBeFalsy();
    expect(contentControl.errors?.['minlength']).toBeTruthy();

    contentControl.setValue('This is a valid post content.');
    expect(contentControl.valid).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTrue();

    component.postForm.controls['title'].setValue('Valid Title');
    component.postForm.controls['content'].setValue('Valid content for the post.');
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

  it('should call postService.createPost() and navigate on successful submission', () => {
    component.postForm.setValue({ title: 'Test Post', content: 'This is test content.' });
    mockPostService.createPost.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockPostService.createPost).toHaveBeenCalledWith({ title: 'Test Post', content: 'This is test content.' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should navigate to /posts when cancel button is clicked', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts']);
  });
});
