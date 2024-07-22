import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TYPE_FORMS } from '../../../constants';
import { LoaderFormComponent } from '../../../dinamic-form/loader-form/loader-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-shop',
  standalone: true,
  imports: [LoaderFormComponent],
  templateUrl: './add-shop.component.html',
  styleUrl: './add-shop.component.css'
})
export class AddShopComponent implements AfterViewInit{
  
  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;
  @ViewChild('addButton') addButton!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router) {
    
  }

  ngAfterViewInit(): void {
      this.addItem();
      this.addButton.nativeElement.disabled = true;
  }

  addItem() : void {
    this.loaderForm.createForm(TYPE_FORMS.CREATE_SHOP);
    this.loaderForm.formSubmitted.subscribe(() => {
      console.log("Redirigiendo a la vista owner");
      this.router.navigate(['/dashboard/owner']);
    });
    this.addButton.nativeElement.disabled = false;
  }

}
