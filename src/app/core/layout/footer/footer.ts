import { Component } from '@angular/core';

import { currentYear } from '../../../shared/utils/date.utils';

@Component({
  selector: 'pe-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly year = currentYear();
}
