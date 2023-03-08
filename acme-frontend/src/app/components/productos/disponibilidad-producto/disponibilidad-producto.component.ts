import { Component, OnInit } from '@angular/core';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-disponibilidad-producto',
  templateUrl: './disponibilidad-producto.component.html',
  styleUrls: ['./disponibilidad-producto.component.css']
})
export class DisponibilidadProductoComponent implements OnInit {

  constructor(private _sucursalesService:SucursalesService) { }

  data:any = {
    idProducto:"",
    cantidad: "",
    idSucursal:""
  }

  sucursales:any = [];

  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales() {
    this._sucursalesService.getSucursales().then( data => {
      this.sucursales = data.$values;
    })
  }
  guardarCantidad(){
    // console.log(this.data);

  }

}
