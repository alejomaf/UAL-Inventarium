using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;

using Xamarin.Forms;

using UALInventarium.Models;
using UALInventarium.Views;
using UALInventarium.Data;

namespace UALInventarium.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        public ObservableCollection<Usuario> Items { get; set; }
        public Command LoadItemsCommand { get; set; }

        public ItemsViewModel()
        {
            Title = "Browse";
            //Items = new ObservableCollection<Item>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());

            /*MessagingCenter.Subscribe<NewItemPage, Usuario>(this, "AddItem", async (obj, item) =>
            {
                var newItem = item as Usuario;
                //Items.Add(newItem);
                await App.Repository.AddUsuarioAsync(newItem);
            });*/
        }

        async Task ExecuteLoadItemsCommand()
        {
            IsBusy = true;

            try
            {
                Items.Clear();
                var items = await DataStore.GetUsuariosAsync(true);
                foreach (var item in items)
                {
                    Items.Add(item);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}