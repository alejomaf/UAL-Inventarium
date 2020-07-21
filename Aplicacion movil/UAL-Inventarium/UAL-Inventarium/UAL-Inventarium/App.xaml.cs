using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using UALInventarium.Services;
using UALInventarium.Views;
using UALInventarium.Data;
using System.Diagnostics;
using UALInventarium.ViewModels;

namespace UALInventarium
{
    public partial class App : Application
    {
        public static UALContext Repository;
        public App()
        {
            InitializeComponent();
            Repository = new UALContext ();
            
            MainPage = new LoginUAL() 
            {
                BindingContext = new LoginViewModel()
            };
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
