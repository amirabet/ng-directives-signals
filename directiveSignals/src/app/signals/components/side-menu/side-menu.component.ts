import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styles: `
  li{ cursor: pointer;}`
})
export class SideMenuComponent {

  /*
  * Formato traicional de listado de opciones de un menú:
  */
  // public menuItems: MenuItem[] = [
  //   { title: 'Counter', route: 'counter' },
  //   { title: 'User Info', route: 'user-info' },
  //   { title: 'Mutations', route: 'properties' },
  // ]
  /*
  * Utilizando Signals:
  * mejora de renidmiento, menos demanda de ciclo de vida...
  * Se impementa con signal<T>(value)
  */
  public menuItems = signal<MenuItem[]>([
    { title: 'Counter', route: 'counter' },
    { title: 'User Info', route: 'user-info' },
    { title: 'Mutations', route: 'properties' },
  ]);

}
