import { Component, input } from '@angular/core';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'pe-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class RatingComponent {
  rating = input.required<Rating>();
}
