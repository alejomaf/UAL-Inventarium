using System;
using System.Collections.Generic;
using System.Text;
using UALInventarium.Models;

namespace UALInventarium.ViewModels
{
    class MainViewModel
    {
        
        public MainViewModel(Usuario usuario){
            username = usuario.nombre;
        }

        public string username { get; set; }
    }
}
