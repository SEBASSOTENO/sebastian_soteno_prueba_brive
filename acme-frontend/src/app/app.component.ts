import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acme-frontend';

  constructor(private _router:Router){}

  inicio(){
    this._router.navigateByUrl('index')
  }

  producto(){
    this._router.navigateByUrl('productos')
  }

  sucursales(){
    this._router.navigateByUrl('sucursales')
  }
}
