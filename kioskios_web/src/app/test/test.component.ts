import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoaderFormComponent } from "../dinamic-form/loader-form/loader-form.component";

@Component({
  selector: 'test',
  standalone: true,
  imports: [RouterOutlet, LoaderFormComponent],
  templateUrl: './test.component.html',
})

export class TestComponent implements AfterViewInit {

  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  ngAfterViewInit(): void {
    if(this.loaderForm)
      this.loaderForm.createForm('test_create_usuario');
    else
      console.log("No se pudo cargar el formulario de login");
  }

}