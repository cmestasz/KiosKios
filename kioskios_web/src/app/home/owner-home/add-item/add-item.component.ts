import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TYPE_FORMS } from '../../../constants';
import { LoaderFormComponent } from '../../../dinamic-form/loader-form/loader-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [LoaderFormComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements AfterViewInit{
  
  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;
  @ViewChild('addButton') addButton!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
      this.addItem();
      this.addButton.nativeElement.disabled = true;
  }

  addItem() : void {
    this.loaderForm.createForm(TYPE_FORMS.CREATE_PRODUCT);
    this.loaderForm.formSubmitted.subscribe(() => {
      console.log("Rediriiendo al vista owner");
      this.router.navigate(['/owner']);
    });
    this.addButton.nativeElement.disabled = false;
  }

}
