using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UAL_InventariumDB.Models;

namespace UAL_InventariumDB.Data
{
    class UAL_IntentariumDBContext: DbContext
    {
        public DbSet<Configuracion> Configuracion { get; set; }
        public DbSet<GrupoObjetos> GrupoObjetos { get; set; }
        public DbSet<Objeto> Objeto { get; set; }
        public DbSet<Prestado> Prestado { get; set; }
        public DbSet<Ubicacion> Ubicacion { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:ual-inventarium.database.windows.net,1433;Initial Catalog=ual-inventarium;Persist Security Info=False;User ID=ual-inventarium;Password=20elMejor1nv€nt@riªdo$WAL20;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
