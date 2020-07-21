using System;
using System.Linq;
using InventariumDB.Data;
using InventariumDB.Models;

namespace InventariumDB
{
    class Program
    {
        static void Main(string[] args)
        {
            UAL_InventariumDBContext database = new UAL_InventariumDBContext();
            /*Usuario usu = database.Usuario
                .Where(p => p.nombre == "AdminUAL").SingleOrDefault();*/
            Usuario usu = new Usuario()
            {
                nombre = "Prueba1",
                contrasena = "Prueba1",
                correoElectronico = "prueba1@gmail.com",
                rango = 0,
                departamento = 1,
                telefono = "000000000"
            };
            database.Usuario.Add(usu);
            database.SaveChanges();
        }
    }
}