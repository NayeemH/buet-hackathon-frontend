import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PendingCours } from '../interfaces/pending-cours';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User: Observable<User>;
  
  pendingCourses: PendingCours = {
    sub: null,
    error: null,
    loading: null,
    data: []
  };
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _blogService: BlogService
    ) { }
    
  ngOnInit(): void {

    this.User = this._authService.$User;

    this.getThePendingCourse();
    //this.bloggerProfile.data._id = this._route.snapshot.paramMap.get('bloggerId');

    // this._route.params.subscribe((params) => {
    //   if( !params.categoryId ) {
    //     this.categoryId = 'all';
    //   } else {
    //     this.categoryId = params.categoryId;
    //   }
    //   this.getBloggerBlogs(this.bloggerProfile.data._id, this.categoryId);
    // });

    // this.getBloggerProfile(this.bloggerProfile.data._id);

  }

  getThePendingCourse() {

    this.pendingCourses.loading = true;
    this.pendingCourses.error = null;

    this.pendingCourses.sub = this._authService.getPendingCourses()
    .subscribe((res: any) => {

      this.pendingCourses.data = res.pendingCourse;
      console.log(this.pendingCourses.data);
      this.pendingCourses.loading = false;
      this.pendingCourses.sub.unsubscribe();
      
    }, err => {
      
      console.log(err);
      this.pendingCourses.error = err;
      this.pendingCourses.loading = false;
      this.pendingCourses.sub.unsubscribe();

    });

  }

}
