using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using UALInventarium.Data;
using UALInventarium.Models;
using UALInventarium.Views;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace UALInventarium.ViewModels
{
    class LoginViewModel : BaseViewModel
    {
        public LoginViewModel()
        {

        }
        /*public ICommand login
        {
            get
            {
                /*return new Command(async () =>
                {
                    Usuario usuario = App.Repository.GetUsuarioAsync.(email);
                    if (usuario != null) if (usuario.contrasena == password) {
                            Application.Current.MainPage = new MainPage() {BindingContext=new MainViewModel(usuario) };
                });
            }
        }*/

        public string email { get; set; }
        public string password { get; set; }
    }
}
