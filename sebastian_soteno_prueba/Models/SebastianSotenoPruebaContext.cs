using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace sebastian_soteno_prueba.Models;

public partial class SebastianSotenoPruebaContext : DbContext
{
    public SebastianSotenoPruebaContext()
    {
    }

    public SebastianSotenoPruebaContext(DbContextOptions<SebastianSotenoPruebaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Disponibilidad> Disponibilidads { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Sucursal> Sucursals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=SEBAS_SOTENO;Database=sebastian_soteno_prueba;Trusted_Connection=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Disponibilidad>(entity =>
        {
            entity.HasKey(e => e.IdDisponibilidad);

            entity.ToTable("Disponibilidad");

            entity.Property(e => e.IdDisponibilidad).HasColumnName("idDisponibilidad");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.Disponibilidads)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Disponibilidad_Productos");

            entity.HasOne(d => d.IdSucursalNavigation).WithMany(p => p.Disponibilidads)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Disponibilidad_Sucursal");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto);

            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.CodigoBarras).HasColumnName("codigo_barras");
            entity.Property(e => e.Nombre)
                .HasMaxLength(250)
                .HasColumnName("nombre");
            entity.Property(e => e.PrecioUnitario)
                .HasMaxLength(100)
                .HasColumnName("precio_unitario");
        });

        modelBuilder.Entity<Sucursal>(entity =>
        {
            entity.HasKey(e => e.IdSucursal);

            entity.ToTable("Sucursal");

            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.Activa).HasColumnName("activa");
            entity.Property(e => e.Nombre)
                .HasMaxLength(250)
                .HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
