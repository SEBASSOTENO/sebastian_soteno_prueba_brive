import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private _productoService:ProductosService, private _router:Router) { }

  productos:any = [];
  cantidades:any = [];
  agregarProducto: boolean = false;
  agregarDisponibilidad: boolean = false;

  loading: boolean = false;

  infoProducto:any = {
    idProd: "",
    nombre: "",
    codigo: "",
    precio: ""
  }

  modificarExistencia:any = {
    idDisponibilidad: "",
    cantidad:""
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().then(data => {
      this.productos = data.$values;
    })
  }

  agregarProductoFuncion() {
    this.agregarProducto = this.agregarProducto ? false : true;
  }

  agregarDisponibilidadFuncion() {
    // this.agregarDisponibilidad = this.agregarDisponibilidad ? false : true;
    this.infoAlert("Pendiente", "Apartado en desarrollo")
  }

  modificar(prod:any){
    this._productoService.getProducto(prod).then(data => {
      this.infoProducto.idProd = data.$values[0].idProducto
      this.infoProducto.nombre = data.$values[0].nombre
      this.infoProducto.codigo = data.$values[0].codigo
      this.infoProducto.precio = data.$values[0].precio
    })
  }

  modificarExistencias(data:any){
    this.modificarExistencia.idDisponibilidad = data.idDis;
    this.modificarExistencia.cantidad = data.cantidad;
    // console.log(this.modificarExistencia);

    this._productoService.UpdateCantidad(this.modificarExistencia).then(result => {
      this.successAlert("Correcto", "Cambios realizados correctamente")
      this.getProductos()
    }).catch(error => {
      console.log(error);
    })
  }

  guardarCambios(){
    this._productoService.updateProductos(this.infoProducto).then(result => {
      this.successAlert("Correcto", "Cambios realizados correctamente")
      this.getProductos()
    }).catch(error => {
      console.log(error);
    })
  }

  agregarCantidad(prod:any){
    this._productoService.getProductoSucursales(prod).then(result => {
      this.cantidades = result.$values;
    }).catch(error => {
      console.log(error);
    })
  }

  errorAlert(title:any, text:any){
    Swal.fire({
      icon: 'error',
      title: title,
      text: text
    })
  }

  successAlert(title:any, text:any){
    Swal.fire({
      icon: 'success',
      title: title,
      text: text
    })
  }

  infoAlert(title:any, text:any){
    Swal.fire({
      icon: 'info',
      title: title,
      text: text
    })
  }

}
