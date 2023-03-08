using Microsoft.AspNetCore.Mvc;
using sebastian_soteno_prueba.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Logging;


namespace sebastian_soteno_prueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : Controller
    {
        private readonly SebastianSotenoPruebaContext _context;

        public ProductoController(SebastianSotenoPruebaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var prod = (from p in _context.Productos
                        select new
                        {
                            id = p.IdProducto,
                            nombre = p.Nombre,
                            codigo = p.CodigoBarras,
                            precio = p.PrecioUnitario
                        }).ToList();

            return Ok(prod);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductoById(int id)
        {
            try
            {
                var producto = (from p in _context.Productos
                                where p.IdProducto == id
                                select new
                                {
                                    idProducto = p.IdProducto,
                                    nombre = p.Nombre,
                                    codigo = p.CodigoBarras,
                                    precio = p.PrecioUnitario
                                }).ToList();

                return Ok(producto);
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }


        [Route("[action]/{id}")]
        public IActionResult getProductoSucursales(int id)
        {
            try
            {
                var producto = (from d in _context.Disponibilidads
                                join p in _context.Productos on d.IdProducto equals p.IdProducto
                                join s in _context.Sucursals on d.IdSucursal equals s.IdSucursal
                                where p.IdProducto == id
                                select new
                                {
                                    idDis = d.IdDisponibilidad,
                                    id = p.IdProducto,
                                    nombre = p.Nombre,
                                    cantidad = d.Cantidad,
                                    sucursal = s.Nombre
                                }).ToList();


                return Ok(producto);
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }


        [EnableCors("AllowOrigin")]
        [AllowAnonymous]
        [Route("[action]")]
        public IActionResult PostProducto([FromBody] dynamic postData)
        {
            var nombre = (string)postData["nombre"];
            var codigo = (int)postData["codigo"];
            var precio = (string)postData["precio"];

            try
            {
                var producto = (from p in _context.Productos
                                where p.Nombre == nombre
                                select p).Count();

                if (producto >= 1)
                {
                    return Ok(-1);
                }
                else
                {
                    var productoAdd = new Producto
                    {
                        Nombre = nombre,
                        CodigoBarras = codigo,
                        PrecioUnitario = precio
                    };

                    _context.Productos.Add(productoAdd);
                    _context.SaveChanges();

                    return Ok(productoAdd);

                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }

        }

        [EnableCors("AllowOrigin")]
        [AllowAnonymous]
        [Route("[action]")]
        public IActionResult UpdateProducto([FromBody] dynamic postData)
        {
            var idProducto = (int)postData["idProd"];
            var codigo = (int)postData["codigo"];
            var precio = (string)postData["precio"];

            Producto productoUpdate = _context.Productos.Where(p => p.IdProducto.Equals(idProducto)).FirstOrDefault();

            try
            {
                productoUpdate.CodigoBarras = codigo;
                productoUpdate.PrecioUnitario = precio;

                _context.SaveChanges();

                return Ok(1);

            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }

        [EnableCors("AllowOrigin")]
        [AllowAnonymous]
        [Route("[action]")]
        public IActionResult UpdateCantidad([FromBody] dynamic postData)
        {
            var idDisponibilidad = (int)postData["idDisponibilidad"];
            var cantidad = (int)postData["cantidad"];

            Disponibilidad DisponibilidadUpdate = _context.Disponibilidads.Where(d => d.IdDisponibilidad.Equals(idDisponibilidad)).FirstOrDefault();

            try
            {
                DisponibilidadUpdate.Cantidad = cantidad;

                _context.SaveChanges();

                return Ok(1);

            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }

        [EnableCors("AllowOrigin")]
        [AllowAnonymous]
        [Route("[action]")]
        public IActionResult compras([FromBody] dynamic postData)
        {
            var idDisponibilidad = (int)postData["idDisponibilidad"];
            var cantidad = (int)postData["cantidad"];

            Disponibilidad DisponibilidadUpdate = _context.Disponibilidads.Where(d => d.IdDisponibilidad.Equals(idDisponibilidad)).FirstOrDefault();

            try
            {
                if (cantidad > DisponibilidadUpdate.Cantidad)
                {
                    return Ok(-1);
                }
                else
                {

                    DisponibilidadUpdate.Cantidad = DisponibilidadUpdate.Cantidad - cantidad;

                    _context.SaveChanges();

                    return Ok(1);
                }

            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }


        [EnableCors("AllowOrigin")]
        [AllowAnonymous]
        [Route("[action]")]
        public ActionResult Query([FromBody] dynamic postData)
        {
            var nombre = (string)postData.nombre;

            var disponibilidad = (from d in _context.Disponibilidads
                                  join p in _context.Productos on d.IdProducto equals p.IdProducto
                                  join s in _context.Sucursals on d.IdSucursal equals s.IdSucursal
                                  where s.Activa == 1
                                  select new
                                  {
                                      id = d.IdDisponibilidad,
                                      nombre = p.Nombre,
                                      cantidad = d.Cantidad,
                                      sucursal = s.Nombre
                                  });

            if (!String.IsNullOrEmpty(nombre))
            {
                disponibilidad = disponibilidad.Where(p => p.nombre.Contains(nombre));
            }

            return Ok(disponibilidad.ToList());
        }
    }

}
