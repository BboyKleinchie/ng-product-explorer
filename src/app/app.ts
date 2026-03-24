import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';
import { ToastComponent } from './shared/components/toast/toast';
import { STORAGE_KEY } from './shared/constants/storage.constants';

@Component({
  selector: 'app-root',
  imports: [
    Footer,
    Header,
    ToastComponent,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  ngOnInit(): void {
  }
}
