import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private _productoService:ProductosService) { }

  productos:any = [];
  queryFinalizado:boolean = false;

  query:any = {
    nombre:""
  }

  compra:any = {
    idDisponibilidad:"",
    cantidad:""
  }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos(){
    this._productoService.getProductos().then(result => {
      this.productos = result.$values
    })
  }

  consultar(query:any) {
    if(this.query.nombre == ""){
      this.errorAlert('Error', 'Ingresa al menos un criterio de búsqueda');
    } else {
      this._productoService.query(this.query).then(result => {
        if(result.$values.length == 0){
          this.infoAlert('Error', 'No se encontraron resultados');
        } else {
          this.queryFinalizado = true;
          this.productos = result.$values
        }
      })
    }
  }

  consultare(data:any){
    this.compra.idDisponibilidad = data.id;
  }

  compras(){
    this._productoService.compras(this.compra).then(result => {
      if(result == -1) {
        this.errorAlert("Error", "Ingresa una cantidad válida")
      } else {
        this.successAlert("Correcto", "Cambios realizados correctamente")
      }
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
