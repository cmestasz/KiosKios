import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-any-home',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './any-home.component.html',
  styleUrl: './any-home.component.css'
})
export class AnyHomeComponent {

}
