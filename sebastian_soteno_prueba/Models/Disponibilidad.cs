using System;
using System.Collections.Generic;

namespace sebastian_soteno_prueba.Models;

public partial class Disponibilidad
{
    public int IdDisponibilidad { get; set; }

    public int Cantidad { get; set; }

    public int IdProducto { get; set; }

    public int IdSucursal { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;

    public virtual Sucursal IdSucursalNavigation { get; set; } = null!;
}
