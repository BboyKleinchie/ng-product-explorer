import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkListComponent } from '../../../shared/components/link-list/link-list';

@Component({
  selector: 'pe-header',
  imports: [
    RouterLink,
    LinkListComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
