import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleuserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  //constructor() { } => no inyectamos desde el constructor
  private _http = inject(HttpClient);
  private _baseUrl = 'https://reqres.in/api/users';

  getUserById(id: number): Observable<User> {
    return this._http.get<SingleuserResponse>(`${this._baseUrl}/${id}`)
      .pipe(
        map( response => response.data),
        //tap( console.log(data))
      )
  }

}
