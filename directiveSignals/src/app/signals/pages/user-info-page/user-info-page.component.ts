import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { User } from '../../interfaces/user-request.interface';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styles: ``
})
export class UserInfoPageComponent implements OnInit {

  //constructor() { } => no inyectamos desde el constructor
  private usersService = inject(UserServicesService);
  public userId = signal(1);

  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if(!this.currentUser())
      return 'User not found';

    return `${this.currentUser()!.first_name} ${this.currentUser()!.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id <= 0)
      return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersService.getUserById(this.userId())
      /*
      * Método básico solo con respuesta:
      */
      // .subscribe(user => {
      //   this.currentUser.set(user)
      // })
      .subscribe({
        /*
        * Método con respuesta y control de errores:
        */
        next: (user) => {
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error: () => {
          this.currentUser.set(undefined);
          this.userWasFound.set(false);
        }
      })

  }

}
