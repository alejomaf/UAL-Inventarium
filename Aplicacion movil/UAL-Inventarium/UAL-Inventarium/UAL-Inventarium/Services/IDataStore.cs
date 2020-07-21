using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UALInventarium.Services
{
    public interface IDataStore<T>
    {
        Task<bool> AddUsuarioAsync(T item);
        Task<bool> UpdateUsuarioAsync(T item);
        Task<bool> DeleteUsuarioAsync(string id);
        Task<T> GetUsuarioAsync(string id);
        Task<IEnumerable<T>> GetUsuariosAsync(bool forceRefresh = false);
    }
}
