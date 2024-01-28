import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Customer, Errors, User } from 'src/app/model/auth-model';
import { Review } from 'src/app/model/review';
import { AccountService } from 'src/app/services/account.service';
import { ReviewService } from 'src/app/services/review.service';
import { Utils } from 'src/app/services/utils';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ChefService } from 'src/app/services/chef.service';
import { LocalChef } from 'src/app/model/localchef';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css'],
})
export class WriteReviewComponent implements OnInit, OnDestroy {
  faStar = faStar;

  /** Review Form */
  reviewForm: FormGroup;
  headline: string;
  comment: string;
  orderReference: string;
  rating: number = 0;
  customer: User;
  somethingWentWrong: boolean;
  order: string;
  chefId: string;
  error: string;
  loading: boolean = false;
  destroy$ = new Subject<void>();
  errors: Errors = { errors: {} };
  errorMessage: any;
  orderNotSupplied: boolean;
  chefNotSupplied: boolean;
  customerNotLoggedIn: boolean;
  chef: import("/Users/maan/projects/bigtree/project-beku/customer-app/src/app/model/localchef").LocalChef;

  constructor(
    private reviewService: ReviewService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private chefService: ChefService,
    private router: Router,
    private utils: Utils
  ) {}

  ngOnInit(): void {
    this.accountService.getData();
    this.accountService.loginSession$.subscribe({
      next: (value) => {
        this.customer = value;
        console.log('Customer subscribed ' + JSON.stringify(this.customer));
      },
      error: (err) => console.error('CustomerSubject emitted an error: ' + err),
      complete: () =>
        console.log('CustomerSubject emitted the complete notification'),
    });
    this.order = this.activatedRoute.snapshot.queryParamMap.get('order');
    this.chefId = this.activatedRoute.snapshot.queryParamMap.get('chef');
    if (this.utils.isEmpty(this.order) ) {
      this.orderNotSupplied = true;
      console.log('Oops. Order is not supplied.');
    }
    if ( this.utils.isEmpty(this.chefId)) {
      this.chefNotSupplied = true;
      console.log('Oops. Chef not supplied');
    } 
    if ( this.utils.isValid(this.customer)) {
      this.customerNotLoggedIn = true;
      console.log('Oops. Customer not logged in');
    }

    this.chef = this.chefService.getData();
    this.chefService.chefSubject$.subscribe({
      next: (value) => {
        this.chef = value;
        console.log('ChefSubject emitted a notification: '+ this.chef)
        if ( (this.chef == null || this.chef === undefined) && !this.utils.isEmpty(this.chefId)){
          this.loadChef();
        }
      },
      error: (err) => console.error('ChefSubject emitted an error: ' + err),
      complete: () =>
        console.log('ChefSubject emitted the complete notification'),
    });
  }
  
  loadChef() {
    let observable1 = this.chefService.getChef(this.chefId);
      observable1.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.chef = data;
          console.log('Loaded chef frm server ')
        },
        error: (err) => {
          console.error('Errors when getting chef from server. '+ JSON.stringify(err));
        },
      });
  }

  setRating(arg0: number) {
    this.rating = arg0;
  }

  cancelReview() {}

  // convenience getter for easy access to form fields
  get reviewFormControls() {
    return this.reviewForm.controls;
  }

  onSubmitReview() {
   
    if (this.utils.isEmpty(this.order)){
      this.order = this.orderReference;
    }
    if (this.utils.isEmpty(this.order)) {
      this.errorMessage = 'Order is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.headline)) {
      this.errorMessage = 'Headline is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.comment)) {
      this.errorMessage = 'Comment is mandatory';
      return;
    }

    this.errorMessage = null;

    this.loading = true;
    var review: Review = new Review();
    review.title = this.headline;
    review.comment = this.comment;
    review.rating = this.rating;
    review.order = this.order;
    review.date = new Date();
    review.chef = this.chef._id;
    if ( this.orderNotSupplied){
      this.order = this.orderReference;
    }
    review.customer = {
      name: this.customer.firstName + ' ' + this.customer.lastName,
      email: this.customer.email,
      mobile: this.customer.mobile,
      _id: '',
      address: null,
    };

    console.log('Submitting review '+ JSON.stringify(review));
    let observable = this.reviewService.createReview(review);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.errorMessage = undefined;
        console.log('Review submitted');
        void this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Errors from submitting review' + JSON.stringify(err));
        this.errors = err;
        this.loading = false;
        this.errorMessage = err.error.detail;
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
