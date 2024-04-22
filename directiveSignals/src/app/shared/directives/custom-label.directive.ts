import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;

  /*
  * Creamos propiedades para controlar el valor de ls Inputs
  */
  private _color: string = "red";
  private _errors?: ValidationErrors | null;

  /*
  * Las directivas admiten parámetros via @Input
  * PERO necesariamente necesitan la keyword "set"
  */
  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  /*
  * En el constructor inyectamos un ElementRef que hace referencia
  * al host de DOM que implementa la directiva
  */
  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.htmlElement = elementRef;
    this.setErrorMessage();
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle() {

    if (!this.htmlElement)
      return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement)
      return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = "The field is valid."
      return;
    }

    const errors = Object.keys(this._errors);

    this.htmlElement.nativeElement.innerHTML = '';

    if (errors.includes('required'))
      this.htmlElement.nativeElement.innerHTML += "This field is required! "

    if (errors.includes('email'))
      this.htmlElement.nativeElement.innerHTML += "Email format is needed! "

    if (errors.includes('minlength')) {
      const minLength: number = this._errors!['minlength'].requiredLength;
      const reminingChars: number = minLength - this._errors!['minlength'].actualLength;
      this.htmlElement.nativeElement.innerHTML += `At least enter ${minLength} characters! Remaining: ${reminingChars}.`
    }
  }

}
