import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './any-home/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NavComponent, FooterComponent, RouterOutlet, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
