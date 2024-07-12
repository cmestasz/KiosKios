import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RouterLink} from '@angular/router';


@Component({
  selector: 'home-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})

export class BannerComponent {

    @ViewChildren('slide') slides!: QueryList<ElementRef>;
    private currentIndex: number = 0;

    nextSlide() {
      this.slides.toArray()[this.currentIndex].nativeElement.classList.remove('active');
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.slides.toArray()[this.currentIndex].nativeElement.classList.add('active');
    }

    prevSlide() {
      this.slides.toArray()[this.currentIndex].nativeElement.classList.remove('active');
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.slides.toArray()[this.currentIndex].nativeElement.classList.add('active');
    }
  }

