using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using UAL_Inventarium.Services;
using UAL_Inventarium.Views;

namespace UAL_Inventarium
{
    public partial class App : Application
    {

        public App()
        {
            InitializeComponent();

            DependencyService.Register<MockDataStore>();
            MainPage = new MainPage();
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
