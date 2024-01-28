import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/review';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent {

  faStar= faStar;
  
  @Input() review: Review;
}
