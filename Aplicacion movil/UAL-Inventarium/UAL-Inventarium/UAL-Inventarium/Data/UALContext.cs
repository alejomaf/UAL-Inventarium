using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using UALInventarium.Models;
using UALInventarium.Services;

namespace UALInventarium.Data
{
    public class UALContext: DbContext, IDataStore<Usuario>
    {
        /// <summary>
        /// Creates our repository.
        /// </summary>
        /// <param name="dbPath">the platform specific the path to the database</param>
        public UALContext()
        {
            //Database.EnsureCreated();
        }

        string _dbPath;
        public DbSet<Configuracion> Configuracion { get; set; }
        public DbSet<GrupoObjetos> GrupoObjetos { get; set; }
        public DbSet<Objeto> Objeto { get; set; }
        public DbSet<Prestado> Prestado { get; set; }
        public DbSet<Ubicacion> Ubicacion { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Debug.WriteLine("Configurando");
            optionsBuilder.UseSqlServer("Server=tcp:ual-inventarium.database.windows.net,1433;Initial Catalog=ual-inventarium;Persist Security Info=False;User ID=ual-inventarium;Password=20elMejor1nv€nt@riªdo$WAL20;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
       
        #region IDataStore<Usuario> start
        public async Task<Usuario> GetUsuarioAsync(String correoElectronico)
        {
            var usuario = await Usuario.FirstOrDefaultAsync(x => x.correoElectronico == correoElectronico).ConfigureAwait(false);
            return usuario;
        }

        public async Task<bool> AddUsuarioAsync(Usuario usuario)
        {
            await Usuario.AddAsync(usuario).ConfigureAwait(false);
            return true;
        }

        public async Task<bool> UpdateUsuarioAsync(Usuario usuario)
        {
            Usuario.Update(usuario);
            await SaveChangesAsync().ConfigureAwait(false);
            return true;
        }

        public async Task<bool> DeleteUsuarioAsync(string nombreUsuario)
        {
            var usuarioBorrar = await Usuario.FirstOrDefaultAsync(x => x.nombre == nombreUsuario).ConfigureAwait(false);
            if (usuarioBorrar != null)
            {
                Usuario.Remove(usuarioBorrar);
                await SaveChangesAsync().ConfigureAwait(false);
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Usuario>> GetUsuariosAsync(bool forceRefresh = false)
        {
            var todosUsuarios = await Usuario.ToListAsync().ConfigureAwait(false);
            return todosUsuarios;
        }

        #endregion
    }
}
