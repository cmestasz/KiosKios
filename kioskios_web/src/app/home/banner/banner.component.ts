import { Component, AfterViewInit } from '@angular/core';


@Component({
  selector: 'home-banner',
  standalone: true,
  imports: [],
  template: `
    <section class="banner">
        <div class="slider">
            <div class="slide active" style="background-image: url('banner.png');">
                <div class="banner-text">
                    <h1>Revisa los nuevos productos disponibles</h1>
                    <p>Encuentra los mejores precios de tus productos y ahorra inteligentemente.</p>
                    <button>Registrate Ya</button>
                </div>
            </div>
            <div class="slide" style="background-image: url('banner2.png');">
                <div class="banner-text">
                    <h1>Revisa los nuevos productos disponibles</h1>
                    <p>Encuentra los mejores precios de tus productos y ahorra inteligentemente.</p>
                    <button>Registrate Ya</button>
                </div>
            </div>

            <div class="slide" style="background-image: url('banner3.png');"></div>
        </div>
        <div class="controls">
            <button id="prevBtn">⟨</button>
            <button id="nextBtn">⟩</button>
        </div>
    </section>
  `,
  styles: `/* Banner */
.banner {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
}

.slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.slide {
    min-width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
    position: relative;
    display: none;
}


.slide.active {
    display: block; /* Mostrar la diapositiva activa */
}
@media (max-width: 768px) {
    header {
        flex-direction: column;
        align-items: flex-start;
    }

    .header-left {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav ul {
        flex-direction: column;
        width: 100%;
    }

    nav ul li {
        width: 100%;
        text-align: center;
    }

    nav ul li a {
        padding: 10px;
        width: 100%;
    }

    .search-bar {
        width: 100%;
    }

    .search-bar input {
        width: calc(100% - 20px);
    }
}
.banner-text {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    color: #fff;
    max-width: 400px;
}

.banner-text h1 {
    font-size: 36px;
    margin-bottom: 10px;
}

.banner-text p {
    font-size: 18px;
    margin-bottom: 20px;
}

.banner-text button {
    padding: 10px 20px;
    background: #ff9900;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
}

/* Controles del banner */
.controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
}

.controls button {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
}

.controls button#prevBtn {
    margin-left: 10px;
}

.controls button#nextBtn {
    margin-right: 10px;
}

/* Responsivo */
@media (max-width: 768px) {
    .banner-text h1 {
        font-size: 28px;
    }

    .banner-text p {
        font-size: 16px;
    }

    .banner-text button {
        padding: 8px 16px;
        font-size: 14px;
    }
}
`
})

export class BannerComponent implements AfterViewInit {
    ngAfterViewInit() {
      const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
      let currentIndex = 0;
  
      document.getElementById('nextBtn')?.addEventListener('click', () => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      });
  
      document.getElementById('prevBtn')?.addEventListener('click', () => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
      });
    }
  }

