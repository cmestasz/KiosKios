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
                        <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><span class="ion-logo-twitter"></span></a></li>
                        <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><span class="ion-logo-facebook"></span></a></li>
                        <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><span class="ion-logo-instagram"></span></a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <p>
                    Kioskios<script>document.write(new Date().getFullYear());</script> Sigue disfrutando de tus compras en KiosKios.com
                </p>
            </div>
        </div>
    </footer>
  `,
  styles: `/*FOOTER*/
.footer {
    background: #121212;
    color: #a3de83;
    padding: 2em 0;
    text-align: center;
    width: 100%;
    align-items: flex-end;
}

.footer .footer-heading {
    font-size: 40px;
    font-weight: bold;
    color: #f7f7f7;
    font-weight: 700;
    margin-bottom: 1em;
}

.footer .menu {
    margin-bottom: 1em;
}

.footer .menu a {
    color: rgba(255, 255, 255, 0.6);
    margin: 0 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
}

.footer .menu a:hover {
    color: #fff;
}

.ftco-footer-social {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 1em;
}

.ftco-footer-social li a {
    display: block;
    width: 40px;
    height: 40px;
    border: 1px solid #a3de83;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s;
}

.ftco-footer-social li a:hover {
    background: #a3de83;
    color: #121212;
}

/* Responsivo */
@media (max-width: 768px) {
    .footer .footer-heading {
        font-size: 20px;
    }
    .footer .menu a {
        font-size: 14px;
    }
}

@media (max-width: 576px) {
    .footer .footer-heading {
        font-size: 18px;
    }
    .footer .menu a {
        font-size: 12px;
    }
}`
})
export class FooterComponent {

}
