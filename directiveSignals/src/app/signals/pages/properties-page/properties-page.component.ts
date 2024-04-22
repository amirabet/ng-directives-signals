import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styles: ``
})
export class PropertiesPageComponent implements OnInit, OnDestroy {
  
  /*
  * Prueba de demostración de la limpieza automática de los efectos:
  * Se retea el efecto, aunque no el setInterval
  */
  ngOnInit(): void {
    // setInterval(() => {
    //   this.counter.update( current => current + 1) ;
    // },1000)
  }

  public user = signal<User>({
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  });

  /*
  * Los efectos se lanzan con cada cambio de las signal() del componente
  * mediante un callback que se llama y limpia de forma automática.
  * Lo podemos vincular a VARIOS signal => lo vinculamos también a counter
  */
  public userChangedEffect = effect( () => {
    //console.log(this.user().first_name);
    console.log(`${ this.user().first_name } - ${ this.counter() }`);
  });

  /*
  * Tamibén se podría hacer la limpieza de forma manual
  * (en este escenario no es necesario)
  */
  ngOnDestroy(): void {
    //this.userChangedEffect.destroy();
  }

  public counter = signal(10);

  public onFieldUpdated(field: /*string*/ keyof User, value: string) {
    /*
    * Modificar el objecto User (valor del Signal) de forma manual:
    */
    // this.user.set({
    //   /* 
    //   * Usando spread del object
    //   * modificamos la propiedad correspondiente
    //   * a partir de lo que nos llega (key = field).
    //   * OJO: Esto es peligroso porque puede generar 
    //   * nuevas propiedades en el objeto!
    //   * Lo securizamos usando "key of User" el el tipado de la propiedad field
    //   */
    //   ...this.user(),
    //   [field]: value
    // })

    /*
    * De nuevo usamos el método Update de signal.
    * En esta primera versión el código es similar al anterior usando spread del object (...)
    */
    this.user.update(current => ({
       ...current,
       [field]: value
    }))

    /*
    * Con este método del switch actulaizamos user pero el effect no se lanza (!?)
    */
    // this.user.update(current => {

    //   switch ( field ){
    //     case 'email':
    //       current.email = value;
    //       break;

    //     case 'first_name':
    //       current.first_name = value;
    //       break;

    //     case 'last_name':
    //       current.last_name = value;
    //       break;
        
    //     case 'avatar':
    //       current.avatar = value;
    //       break;

    //     case 'id':
    //       current.id = Number(value);
    //       break;

    //     //... podríamos continuar con todos los valores
    //     // que deseemos modificar
    //   }
    //   return current;
    //})
  }

  increaseBy(value: number) {
    this.counter.update(current => current + value)
  }
}
