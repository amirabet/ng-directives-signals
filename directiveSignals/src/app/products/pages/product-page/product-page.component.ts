import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent {

  /*
  * Inyeccion "clásica" en el constructor
  */
  //constructor ( private fb: FormBuilder ){}

  /*
  * Tipo de inyección que encaja muy bien con el paradigma de los Signals
  * No creamos la instancia del fb, solo su inyección para usarlo
  */
  private fb = inject( FormBuilder );

  public color: string = "green";

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email ] ]
  })

  changeColor(){
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }

}
