import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styles: ``
})
export class CounterPageComponent {

  // Signal de lectura y escritura
  public counter = signal(10);
  // Signal de sólo lectura => ligada a cualquier cambio de otra signal()
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number) {

    /*
    * Método manual con el signal().set
    */
    //this.counter.set( this.counter() + value );

    /*
    * Usando signal().update => tiene una función que posee el valor actual
    */
    this.counter.update(current => current + value)
  }
}
