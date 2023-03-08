import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgregarProductoComponent } from './components/productos/agregar-producto/agregar-producto.component';
import { DisponibilidadProductoComponent } from './components/productos/disponibilidad-producto/disponibilidad-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductosComponent,
    SucursalesComponent,
    AgregarProductoComponent,
    DisponibilidadProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
