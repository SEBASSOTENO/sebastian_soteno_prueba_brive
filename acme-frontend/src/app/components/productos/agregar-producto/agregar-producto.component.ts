import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  constructor(private _productosService:ProductosService, private _router:Router) { }

  loading:boolean = false;

  ngOnInit(): void {
  }

  data:any = {
    nombre:"",
    codigo:"",
    precio:""
  }

  guardarProducto(data:any){
    if(data.nombre == "" || data.codigo == "" || data.precio == ""){
      this.errorAlert("Error", "Llena todos los campos requeridos")
    } else {
      this._productosService.postProductos(data).then(result => {
        if(result == -1){
          this.errorAlert('Error', 'El producto que intentas registrar ya está dado de alta');
        } else {
          // this.loading = true;
          this.successAlert('Correcto', 'Producto registrado satisfactoriamente');
        }
      }).catch(error => {
        console.log(error);
      })
    }
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
    }).then((result) => {
      if(result.isConfirmed) {
        this._router.navigateByUrl('/index');
      }
    })
  }


}
