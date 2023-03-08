using Microsoft.AspNetCore.Mvc;
using sebastian_soteno_prueba.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace sebastian_soteno_prueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalController : Controller
    {
        private readonly SebastianSotenoPruebaContext _context;

        public SucursalController(SebastianSotenoPruebaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suc = (from s in _context.Sucursals 
                       where s.Activa == 1
                       select new
                       {
                           id = s.IdSucursal,
                           nombre = s.Nombre,
                       }).ToList();

            return Ok(suc);
        }

        [Route("[action]/{id}")]
        public IActionResult bajaSucursal(int id)
        {
            var idSuc = (int)id;

            try
            {
                var suc = (from s in _context.Sucursals
                           where s.Activa == 1
                           select s).ToList();

                Models.Sucursal sucursal = _context.Sucursals.Where(s => s.IdSucursal.Equals(idSuc)).FirstOrDefault();

                sucursal.Activa = 0;

                _context.SaveChanges();

                return Ok(suc);
            }
            catch(Exception e)
            {
                return Ok(e.Message);
            }
        }
    }
}
