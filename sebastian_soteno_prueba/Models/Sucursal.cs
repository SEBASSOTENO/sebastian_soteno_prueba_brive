using System;
using System.Collections.Generic;

namespace sebastian_soteno_prueba.Models;

public partial class Sucursal
{
    public int IdSucursal { get; set; }

    public string Nombre { get; set; } = null!;

    public int? Activa { get; set; }

    public virtual ICollection<Disponibilidad> Disponibilidads { get; } = new List<Disponibilidad>();
}
