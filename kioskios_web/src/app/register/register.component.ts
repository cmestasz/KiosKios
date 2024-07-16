import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoaderFormComponent } from '../dinamic-form/loader-form/loader-form.component';
import { TYPE_FORMS } from '../constants';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoaderFormComponent, FooterComponent, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit{

  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;
  @ViewChild('ownerButton') ownerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('userButton') userButton!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
      this.loadUser();
      this.userButton.nativeElement.disabled = true;
  }

  loadOwner() : void {
    this.loaderForm.createForm(TYPE_FORMS.CREATE_OWNER);
    this.loaderForm.formSubmitted.subscribe(() => {
      console.log("Rediriiendo al login");
      this.router.navigate(['/login']);
    });
    this.ownerButton.nativeElement.disabled = true;
    this.userButton.nativeElement.disabled = false;
  }

  loadUser() : void {
    this.loaderForm.createForm(TYPE_FORMS.CREATE_USER);
    this.loaderForm.formSubmitted.subscribe(() => {
      console.log("Rediriiendo al login");
      this.router.navigate(['/login']);
    });
    this.ownerButton.nativeElement.disabled = false;
    this.userButton.nativeElement.disabled = true;
  }

}
