import { Component, OnInit } from '@angular/core';
import { SucursalesService } from 'src/app/services/sucursales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  constructor(private sucursalService:SucursalesService) { }

  sucursales:any = [];

  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales() {
    this.sucursalService.getSucursales().then( data => {
      this.sucursales = data.$values;
    })
  }

  baja(suc:any) {
    Swal.fire({
      title: 'Confirmar',
      text: 'Estás a punto de borrar a: ' + suc.nombre,
      icon: 'warning',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sucursalService.bajaSucursal(suc.id).then(data => {
          this.getSucursales()
          this.successAlert("Correcto", "Cambios guardados satisfactoriamente")
        })
      }
    })
  }

  successAlert(title:any, text:any){
    Swal.fire({
      icon: 'success',
      title: title,
      text: text
    })
  }

}
