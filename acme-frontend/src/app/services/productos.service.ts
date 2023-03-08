import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _http:HttpClient) {}

  public getProductos():Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.get<any>(`${environment.baseUrl}Producto`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public getProducto(param:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.get<any>(`${environment.baseUrl}Producto/${param}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public getProductoSucursales(param:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.get<any>(`${environment.baseUrl}Producto/getProductoSucursales/${param}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public postProductos(params:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}Producto/PostProducto`, params).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public updateProductos(params:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.put<any>(`${environment.baseUrl}Producto/UpdateProducto`, params).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public UpdateCantidad(params:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.put<any>(`${environment.baseUrl}Producto/UpdateCantidad`, params).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public compras(params:any):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.put<any>(`${environment.baseUrl}Producto/compras`, params).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public query(params:any):Promise<any>{
    return new Promise ((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}Producto/Query`, params).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }
}
