import { Component } from '@angular/core';

@Component({
  selector: 'home-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
        <div class="container-footer">
            <div class="row">
                <div>
                    <h2 class="footer-heading logo">Kios Kios</h2>
                    <p class="menu">
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Coments</a>
                        <a href="#">All</a>
                        <a href="#">Contact</a>
                    </p>
                    <ul class="ftco-footer-social ">
                    </ul>
                </div>
            </div>
            <div class="row">
                <p>
                    Kioskios | <script>document.write(new Date().getFullYear());</script> Sigue disfrutando de tus compras en KiosKios.com
                </p>
            </div>
        </div>
    </footer>
  `,
  styles: ``
})
export class FooterComponent {

}
