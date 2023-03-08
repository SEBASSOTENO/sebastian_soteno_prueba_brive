import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { IndexComponent } from './components/index/index.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'sucursales',
    component: SucursalesComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
