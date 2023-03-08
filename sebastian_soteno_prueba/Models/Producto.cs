using System;
using System.Collections.Generic;

namespace sebastian_soteno_prueba.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string Nombre { get; set; } = null!;

    public int CodigoBarras { get; set; }

    public string PrecioUnitario { get; set; } = null!;

    public virtual ICollection<Disponibilidad> Disponibilidads { get; } = new List<Disponibilidad>();
}
