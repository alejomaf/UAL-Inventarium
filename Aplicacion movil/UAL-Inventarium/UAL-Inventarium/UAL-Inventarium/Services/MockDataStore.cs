using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UALInventarium.Models;

namespace UALInventarium.Services
{
    public class MockDataStore : IDataStore<Usuario>
    {
        readonly List<Usuario> Usuarios;

        public MockDataStore()
        {
            Usuarios = new List<Usuario>();
        }

        public async Task<bool> AddUsuarioAsync(Usuario usuario)
        {
            Usuarios.Add(usuario);

            return await Task.FromResult(true);
        }

        public async Task<bool> UpdateUsuarioAsync(Usuario Usuario)
        {
            var oldUsuario = Usuarios.Where((Usuario arg) => arg.nombre == Usuario.nombre).FirstOrDefault();
            Usuarios.Remove(oldUsuario);
            Usuarios.Add(Usuario);

            return await Task.FromResult(true);
        }

        public async Task<bool> DeleteUsuarioAsync(string id)
        {
            var oldUsuario = Usuarios.Where((Usuario arg) => arg.correoElectronico == id).FirstOrDefault();
            Usuarios.Remove(oldUsuario);

            return await Task.FromResult(true);
        }

        public async Task<Usuario> GetUsuarioAsync(string id)
        {
            return await Task.FromResult(Usuarios.FirstOrDefault(s => s.correoElectronico == id));
        }

        public async Task<IEnumerable<Usuario>> GetUsuariosAsync(bool forceRefresh = false)
        {
            return await Task.FromResult(Usuarios);
        }
    }
}