import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(private _http:HttpClient) {}

  public getSucursales():Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.get<any>(`${environment.baseUrl}Sucursal`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public bajaSucursal(param:any):Promise<any>{
    return new Promise ((resolve, reject) => {
      this._http.get<any>(`${environment.baseUrl}Sucursal/bajaSucursal/${param}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }
}
